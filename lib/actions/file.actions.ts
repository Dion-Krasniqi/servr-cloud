'use server';

import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { baseLink, constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
import { DeleteFileProps, FileType, GetFilesProps, RenameFileProps, UpdateFileUsersProps, UploadFileProps, User, Document } from "@/types";

const handleError = (error:unknown, message:string) => {

    console.log(error, message);
    throw(error);

}


export const uploadFile = async({file, ownerId,  path}:UploadFileProps)=> {

    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("dir_path", "");
        const token = await createSessionClient();
        const response = await fetch(`${baseLink}/upload_file`, {
                                      method: 'POST',
                                      headers: { 'Authorization': `Bearer ${token}` },
                                      body: formData,
                                    })
        const data = await response.json();
        revalidatePath(path);
        return parseStringify(data);

    } catch (error) {
        handleError(error, 'Failed to upload files')
    }
}

const createQueries = async(currentUser:User, types:string[], searchText:string, sort?:string, limit?:number)=> {
    const queries: Record<string,any> = { 'owner' :currentUser }

    if (types.length>0) queries['types'] = types;
    if (searchText) queries['searchText'] = searchText;
    if (limit) queries['limit'] = limit

    if (sort){
        const [sortBy, orderBy] = sort.split('-');
        queries['sort'] = (orderBy==='asc' ? '' : '-') + sortBy
    }
    

    return queries;

}

export const getFiles = async({types=[], searchText='', sort='date-desc',limit}:GetFilesProps)=> {
    const token = await createSessionClient();
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User not found!');
        const queries = await createQueries(currentUser, types, searchText, sort, limit);
        let link = `http://localhost:8001/get-files`;
        //link = link + '?sort=' + queries['sort']
        //f (types.length>0){
        //   link = link + '&queries=' + queries['types']
        //}
        const response = await fetch('http://localhost:8001/get-files', {
                                      method: 'GET',
                                      headers: { 'Authorization': `Bearer ${token}`, },
                                    })
        const files: Document[] =  await response.json();
        console.log(files);
        return files;
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

export const deleteFile = async({owner,file,path}:DeleteFileProps)=> {
    const { tablesDB, storage } = await createAdminClient();

    try {
        revalidatePath(path);
        return parseStringify({status: 'success'});
    } catch (error){
        handleError(error, "Failed to delete file!")
    }

}

export async function getTotalSpaceUsed (types:string[]){
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User not found!');
        const queries = await createQueries(currentUser, types,'')

        const files = [1]
        const totalSpace = {
            document : {size:0, latestDate: ""},
            image: {size:0, latestDate: ""},
            video: {size:0, latestDate: ""},
            audio: {size:0, latestDate: ""},
            other: {size:0, latestDate: ""},
            used: 0,
            all: 2 * 1024*1024*1024, // 2GB
        }
        files.forEach((file) => {
        const fileType = 'image';
        totalSpace[fileType].size += 0;
        totalSpace.used += 0;

        if (!totalSpace[fileType].latestDate || new Date() > new Date(totalSpace[fileType].latestDate)) {
            totalSpace[fileType].latestDate = '2017';
        }
    });

    return parseStringify(totalSpace);
    } catch (error) {
    handleError(error, "Error calculating total space used:, ");
  }
}