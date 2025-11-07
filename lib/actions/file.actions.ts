'use server';

import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

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

const createQueries = async(currentUser:Models.Document)=> {
    const queries = 
    [
        Query.or([
                Query.equal('Owner', [currentUser.$id]),
            
        ])
    ];
    
    

    return queries;

}

export const getFiles = async()=> {
    const { tablesDB } = await createAdminClient();
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User not found!');
        const queries = createQueries(currentUser);
        const files = await tablesDB.listRows(
            appwriteConfig.databaseId,
            appwriteConfig.filesId,
            [Query.or([Query.equal('Owner', [currentUser.$id]), Query.contains('Users',[currentUser.Email])])],
        );
        

        return parseStringify(files);
    } catch (error){
        handleError(error, 'Failed to get files!');
    }
}

export const renameFile = async({fileId, name, extension, path}:RenameFileProps)=> {
    const { tablesDB } = await createAdminClient();

    try {
        console.log('maroon');
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