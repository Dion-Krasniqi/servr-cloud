import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value:unknown) => {
  return JSON.parse(JSON.stringify(value));
}

export const getFileIcon = (extension:string,type:string) => {
  if (type=='folder') return '/folder.png';
  if (!extension) return '/file.svg';

  switch(type){
    case 'document':
      return '/file.svg'
  }

  return '/file.svg';

}

export const getFileTypeParams = (type:string)=> {
  switch (type){
    case "documents":
      return ["document"];
    case "media":
      return ["media"];
    case "folder":
      return ["folder"];
    default:
      return ["document"];
  }

};

export const convertFileToUrl = (file:File) => URL.createObjectURL(file);


export const constructFileDownloadUrl = (url: string) => {
  return url;
};

export const baseLink = 'http://localhost:8001';