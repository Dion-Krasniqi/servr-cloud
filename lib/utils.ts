import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value:unknown) => {
  return JSON.parse(JSON.stringify(value));
}

export const getFileType = (filename:string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  if (!extension) return {type: 'other', extension:''};

  const documentExtensions = [
    'pdf'
  ]
  const imageExtensions = [
    'jpg',
    'png'
  ]

  if (documentExtensions.includes(extension)){
    return {type:'document', extension}
  }
  if (imageExtensions.includes(extension)){
    return {type:'image', extension}
  }

  return {type:'other', extension:''};

}

export const getFileIcon = (extension:string,type:string) => {

  if (!extension) return './globe.svg';

  

  switch(type){
    case 'document':
      return './file.svg'
  }

  return './globe.svg';

}

export const convertFileToUrl = (file:File) => URL.createObjectURL(file);

export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};
