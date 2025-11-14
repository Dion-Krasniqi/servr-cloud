'use server';

import { createAdminClient, createSessionClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
import { DeleteFileProps, FileType, GetFilesProps, RenameFileProps, UpdateFileUsersProps, UploadFileProps } from "@/types";

const handleError = (error:unknown, message:string) => {

    console.log(error, message);
    throw(error);

}


export const uploadFile = async({file, OwnerId, AccountId, path}:UploadFileProps)=> {
    const { storage, tablesDB } = await createAdminClient();

    try {
        const inputFile = InputFile.fromBuffer(file, file.name);
        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile)

        const fileDocument = {
            Type: getFileType(bucketFile.name).type,
            Name: bucketFile.name,
            Url: constructFileUrl(bucketFile.$id),
            Extension: getFileType(bucketFile.name).extension,
            Size: bucketFile.sizeOriginal,
            Owner: OwnerId,
            AccountId,
            Users: [],
            BucketFileId: bucketFile.$id,

        }

        const newFile = await tablesDB.createRow(appwriteConfig.databaseId,
                                                 appwriteConfig.filesId,
                                                 ID.unique(),
                                                 fileDocument).catch(async(error:unknown)=>{
                                                    await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
                                                    handleError(error,'Failed to create file document')
                                                 });
        revalidatePath(path);
        return parseStringify(newFile);

    } catch (error) {
        handleError(error, 'Failed to upload files')
    }
}

const createQueries = async(currentUser:Models.Document, types:string[], searchText:string, sort:string, limit?:number)=> {
    const queries = [Query.or([Query.equal('Owner', [currentUser.$id]), Query.contains('Users',[currentUser.Email])])]

    if (types.length>0) queries.push(Query.equal('Type',types));
    if (searchText) queries.push(Query.contains('Name',searchText));
    if (limit) queries.push(Query.limit(limit));

    if (sort){
        const [sortBy, orderBy] = sort.split('-');
        queries.push(orderBy==='asc' ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy))
    }
    

    return queries;

}

export const getFiles = async({types=[], searchText='', sort='$createdAt-desc',limit}:GetFilesProps)=> {
    const { tablesDB } = await createAdminClient();
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User not found!');
        const queries = await createQueries(currentUser, types, searchText, sort, limit);
        const files = await tablesDB.listRows(
            appwriteConfig.databaseId,
            appwriteConfig.filesId,
            queries,
        );
        

        return parseStringify(files);
    } catch (error){
        handleError(error, 'Failed to get files!');
    }
}

export const renameFile = async({fileId, name, extension, path}:RenameFileProps)=> {
    const { tablesDB } = await createAdminClient();

    try {
        const newName = `${name}.${extension}`;
        const updatedFile = await tablesDB.updateRow(
            appwriteConfig.databaseId,
            appwriteConfig.filesId,
            fileId,
            {Name: newName},

        )
        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error){
        handleError(error, "Failed to rename file!")
    }

}

export const updateFileUsers = async({fileId, emails, path}:UpdateFileUsersProps)=> {
    const { tablesDB } = await createAdminClient();

    try {
        
        const updatedFile = await tablesDB.updateRow(
            appwriteConfig.databaseId,
            appwriteConfig.filesId,
            fileId,
            {Users: emails},

        )
        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error){
        handleError(error, "Failed update file users!")
    }

}

export const deleteFile = async({fileID, BucketFileID, path}:DeleteFileProps)=> {
    const { tablesDB, storage } = await createAdminClient();

    try {
        
        const deletedFile = await tablesDB.deleteRow(
            appwriteConfig.databaseId,
            appwriteConfig.filesId,
            fileID,

        )
        if (deletedFile){
            await storage.deleteFile({bucketId:appwriteConfig.bucketId, fileId:BucketFileID});
        }
        revalidatePath(path);
        return parseStringify({status: 'success'});
    } catch (error){
        handleError(error, "Failed to delete file!")
    }

}

export async function getTotalSpaceUsed (){
    try {
        const { tablesDB } = await createSessionClient();
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User not found!');

        const files = await tablesDB.listRows(
            appwriteConfig.databaseId,
            appwriteConfig.filesId,
            [Query.equal('Owner', [currentUser.$id])],
        )
        const totalSpace = {
            document : {size:0, latestDate: ""},
            image: {size:0, latestDate: ""},
            video: {size:0, latestDate: ""},
            audio: {size:0, latestDate: ""},
            other: {size:0, latestDate: ""},
            used: 0,
            all: 2 * 1024*1024*1024, // 2GB
        }
        files.rows.forEach((file) => {
        const fileType = file.Type as FileType;
        totalSpace[fileType].size += file.Size;
        totalSpace.used += file.Size;

        if (!totalSpace[fileType].latestDate || new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)) {
            totalSpace[fileType].latestDate = file.$updatedAt;
        }
    });

    return parseStringify(totalSpace);
    } catch (error) {
    handleError(error, "Error calculating total space used:, ");
  }
}