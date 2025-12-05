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
    fileId:string;
    name:string;
    extension:string;
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
    fileID:string;
    BucketFileID:string;
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
    id: string;
    username: string;
    email: string;
}

interface Document {
    id: string;
    name: string;
    createdAt:string;
    lastModified:string;
    url:string;
    type:FileType;
    extension:string;
    size:number;
    ownerName:string;
    sharedWith:string[];
    bucket:string;
}