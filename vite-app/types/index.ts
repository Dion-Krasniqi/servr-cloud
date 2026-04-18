export interface UploadFileProps {
    file:File;
    parentId:string;
    path:string;
}

export interface CreateFolderProps {
    ownerId:string;
    parentId:string;
    folderName:string;
    path:string;
}

export interface ActionType {
    value:string;
    label:string;
}

export interface RenameFileProps {
    file_id:string;
    file_name:string;
    path:string;
}

export interface ShareProps {
    file:Document;
    onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
    onRemove:(email:string)=>void;
}

export interface UpdateFileUsersProps {
    fileId:string;
    emails:string[];
    path:string;
}

export interface DeleteFileProps {
    file_id:string;
    path:string;
}

export type FileType = "document" | "media" | "other";

interface GetFilesProps {
  types: string[];
  searchText?: string;
  sort?: string;
  limit?: number;
  folder?:string;
}

interface User {
    user_id: string;
    email: string;
    storage_used: number;
}

export interface Document {
    file_id: string;
    owner_id: string;
    parent_id: string;
    file_name: string;
    extension: string;
    size:number;
    file_type:string;
    created_at:string;
    last_modified:string;
    sharedWith:string[];
    url?:string | null;
}