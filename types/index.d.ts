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