import { Models } from "node-appwrite";

interface UploadFileProps {
    file:File;
    ownerId:string;
    path:string;

}

interface ActionType {
    value:string;
    label:string;
}

interface RenameFileProps {
    file_id:string;
    file_name:string;
    path:string;
}

interface ShareProps {
    file:Document;
    onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
    onRemove:(email:string)=>void;
}

interface UpdateFileUsersProps {
    fileId:string;
    emails:string[];
    path:string;
}

interface DeleteFileProps {
    file_id:string;
    path:string;
}

type FileType = "document" | "media" | "other";

interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}

interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface User {
    user_id: string;
    email: string;
    storage_used: number;
}

interface Document {
    file_id: string;
    owner_id: string;
    parent_id: string;
    file_name: string;
    extension:string;
    size:number;
    file_type:string;
    created_at:string;
    last_modified:string;
    sharedWith:string[];
    url:string;
}