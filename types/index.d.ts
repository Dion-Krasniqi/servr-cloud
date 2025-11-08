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