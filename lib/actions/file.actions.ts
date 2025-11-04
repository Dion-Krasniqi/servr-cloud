'use server';

import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

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
            owner: OwnerId,
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