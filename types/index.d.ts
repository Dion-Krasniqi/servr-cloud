import { Models } from "node-appwrite";

interface UploadFileProps {
    file:File;
    OwnerId:string;
    AccountId:string;
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
    file:Models.Document;
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

type FileType = "document" | "image" | "video" | "audio" | "other";

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