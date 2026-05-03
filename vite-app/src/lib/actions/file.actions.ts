import { createSessionClient } from "../config";
import { backConfig } from "../config/config";
import { baseLink, parseStringify } from "../utils";
//import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
import type { DeleteFileProps, GetFilesProps, RenameFileProps, UpdateFileUsersProps, UploadFileProps, User, Document, CreateFolderProps } from "../../types";


const handleError = (error:unknown, message:string) => {
    console.log(error, message);
    throw(error);
}
export const uploadFile = async({file, parentId, path}:UploadFileProps) => {
    let parental = '';
    if (parentId) parental = parentId
    try {
        const formData = new FormData();
        formData.append("file", file);
        if (parental) formData.append("parent_id", parental)
        const response = await fetch(`${baseLink}/upload-file`, {
                                      method: 'POST',
				      credentials: 'include',
                                      body: formData,
        })
        const data = await response.json();
        //revalidatePath(path);
        return parseStringify(data);
    } catch (error) {
        handleError(error, 'Failed to upload files')
    }
}

const sortFiles = async (files:Document[], sort:string) => {
    console.log(sort);
    let filestoSort : Document[] = files;
    const sorting = sort;
    switch (sorting) {
        case 'date-desc':
            filestoSort = files.sort((a,b) => a.last_modified> b.last_modified ? -1 : 1)
        case 'date-asc':
            filestoSort = filestoSort.sort((a,b) => a.last_modified> b.last_modified ? 1 : -1)
        case 'name-asc':
            filestoSort = filestoSort.sort((a,b) => a.file_name> b.file_name ? 1 : -1)
        case 'name-desc':
            filestoSort = filestoSort.sort((a,b) => a.file_name> b.file_name ? -1 : 1)
        case 'size-desc':
            filestoSort = files.sort((a,b) => a.size> b.size ? -1 : 1)
        case 'size-asc':
            filestoSort = files.sort((a,b) => a.size> b.size ? 1 : -11)
        
    }
    return filestoSort

}

export const getFiles = async (
	{ types=[], 
	  searchText='', 
	  sort='date-desc',
	  limit, 
	  folder=''} : GetFilesProps
) => {
    const type = types[0];
    let files: Document[] = [];
    try {
        const response = await fetch(`${baseLink}/get-files`, {
                                      method: 'GET',
				      credentials: 'include',
                                    })
        if (!response.ok) return files
        const data = await response.json()
	console.log(data)
        if (!Array.isArray(data)) return files
        files =  data as Document[];
        if (folder) return files.filter((f)=>f.parent_id == folder)
        if(type=='home') {
	 return files.filter((f)=>f.parent_id=='' || f.parent_id == null)
	} else if (type) files = files.filter((f)=>f.file_type==type)
        if(searchText) {
		files = files.filter((f)=>f.file_name.includes(searchText))
	}
        return files;
    } catch (error){
        handleError(error, 'Failed to get files!');
        return files;
    }
}

export const renameFile = async (
	{file_id, file_name, path} : RenameFileProps
) => {
    const id = file_id;
    const new_name = file_name;
    try {
        const response = await fetch(`${baseLink}/rename-file`, {
                                      method: 'POST',
				      credentials: 'include',
                                      body: JSON.stringify({file_id:id, 
							   file_name:new_name}),
        })
        const data = await response.json();
        //revalidatePath(path);
    } catch (error) {
        handleError(error, 'Failed to rename file')
    }
}

export const updateFileUsers = async (
	{fileId, emails, path} : UpdateFileUsersProps
) => { console.log(fileId) }

export const deleteFile = async (
	{file_id, path} : DeleteFileProps
) => {
    console.log(file_id)
    const id = file_id;
    console.log(id)
    try {
        const response = await fetch(`${baseLink}/delete-file`, {
                                      method: 'POST',
				      credentials: 'include',
				      headers: {"Content-Type":
					        "application/json"},
                                      body: JSON.stringify({file_id : file_id}),
                                    })

        const data = await response.json();
        console.log(data);
        //revalidatePath(path);
        return parseStringify(data);
    } catch (error) {
        handleError(error, 'Failed to delete file')
    }
}

export async function getTotalSpaceUsed ( types:string[]
) {
    try {
	const currentUser = await getCurrentUser()
	if (!currentUser) throw new Error("User not found!")
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

export const createFolder = async (
	{ownerId, parentId, folderName, path} : CreateFolderProps
) => {
    console.log(parentId)
    try {
        const response = await fetch(`${baseLink}/create-folder`, {
                                      method: 'POST',
				      credentials: 'include',
				      headers: {"Content-Type":
					        "application/json"},
                                      body:  JSON.stringify
				      ({folder_name:folderName, 
				       parent_id:parentId}),
        })
        const data = await response.json();
        //revalidatePath(path);
        return parseStringify(data);
    } catch (error) {
        handleError(error, 'Failed to create folder')
    }
}
