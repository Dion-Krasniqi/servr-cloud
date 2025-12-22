'use server';

import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { baseLink, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
import { DeleteFileProps, GetFilesProps, RenameFileProps, UpdateFileUsersProps, UploadFileProps, User, Document } from "@/types";

const handleError = (error:unknown, message:string) => {

    console.log(error, message);
    throw(error);

}


export const uploadFile = async({file, ownerId,  path}:UploadFileProps)=> {

    try {
        const formData = new FormData();
        formData.append("file", file);
        const token = await createSessionClient();
        const response = await fetch(`${baseLink}/upload-file`, {
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
    const type = types[0];
    const token = await createSessionClient();
    let files: Document[] = [];
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User not found!');
        const response = await fetch('http://localhost:8001/get-files', {
                                      method: 'GET',
                                      headers: { 'Authorization': `Bearer ${token}`, },
                                    })
        if (!response.ok) {
            return files;
        }
        const data = await response.json();
        if (!Array.isArray(data)){
            return files;
        }
        files =  data as Document[];
        if(type) {
            console.log(type)
            files = files.filter((f)=>f.file_type==type)
        }
        if(searchText){
            files = files.filter((f)=>f.file_name.includes(searchText))
        }
        return files;
    } catch (error){
        return files;
        handleError(error, 'Failed to get files!');
    }
}

export const renameFile = async({file_id, file_name, path}:RenameFileProps)=> {

    const id = file_id;
    const new_name = file_name;
    try {
        const token = await createSessionClient();
        console.log(JSON.stringify({file_id:id, file_name:new_name}));
        const response = await fetch(`http://localhost:8001/rename-file`, {
                                      method: 'POST',
                                      headers: { 'Authorization': `Bearer ${token}`,
                                                 'Content-Type': 'application/json' },
                                      body: JSON.stringify({file_id:id, file_name:new_name}),
                                    })

        const data = await response.json();
        revalidatePath(path);
    } catch (error) {
        handleError(error, 'Failed to rename file')
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

export const deleteFile = async({file_id, path}:DeleteFileProps)=> {
    const id = file_id;
    try {
        const token = await createSessionClient();
        const response = await fetch(`http://localhost:8001/delete-file`, {
                                      method: 'POST',
                                      headers: { 'Authorization': `Bearer ${token}`,
                                                 'Content-Type': 'application/json' },
                                      body: JSON.stringify({file_id:id}),
                                    })

        const data = await response.json();
        console.log(data);
        revalidatePath(path);
        return parseStringify(data);

    } catch (error) {
        handleError(error, 'Failed to delete file')
    }

}

export async function getTotalSpaceUsed (types:string[]){
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User not found!');
        //const queries = await createQueries(currentUser, types,'')

        const files = [1]
        const totalSpace = {
            document : {size:0, latestDate: ""},
            image: {size:0, latestDate: ""},
            video: {size:0, latestDate: ""},
            audio: {size:0, latestDate: ""},
            other: {size:0, latestDate: ""},
            used: currentUser.storage_used,
            all: 2 * 1024*1024, // 2MB
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