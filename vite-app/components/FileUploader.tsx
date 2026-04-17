'use client';
import {MouseEvent, useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button';
import { cn, convertFileToUrl, } from '@/lib/utils';
import { Files } from 'lucide-react';
import Thumbnail from './Thumbnail';
import Image from 'next/image';
import { MAX_FILE_SIZE } from '@/constants';
import { toast } from "sonner";
import { uploadFile } from '@/lib/actions/file.actions';
import { usePathname } from 'next/navigation';



const FileUploader = ({ownerId, className}:{ownerId:string;className?:string}) => {
  const path = usePathname();
  const [file, setFile] = useState<File[]>([]);
  const parentId = path.split('/').at(2) || '';
  const onDrop = useCallback(async(acceptedFiles:File[]) => {
    setFile(acceptedFiles);

    const uploadPromises = acceptedFiles.map(async (file)=> {
      if (file.size > MAX_FILE_SIZE) {
        setFile((prevFile)=>prevFile.filter((f)=>f.name != file.name));
        return toast(<p><span className='font-semibold'>
          {file.name}</span>  is too large. Max size is {MAX_FILE_SIZE}MB</p>)
      }
      return uploadFile({file,parentId,path}).then((uploadedFile)=>{
        if(uploadedFile){
          setFile((prevfile)=>prevfile.filter((f)=>f.name!=file.name))
        }
      })
    })
    /*acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    });*/
    await Promise.all(uploadPromises);
    
  }, [ownerId,path])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  // maybe add mousevent mrena
  const handleRemoveFile = (e:React.MouseEvent<HTMLParagraphElement>, filename:string)=> {

    e.stopPropagation();
    setFile((prevFile)=>prevFile.filter((file)=>file.name != filename));

  }

  return (
    <div {...getRootProps()} style={{width:100, alignSelf:'center'}}>
      <input {...getInputProps()} />
      <Button type='button' className={cn('uploader-button', className, 'cursor-pointer')} style={{width:'100%'}}><p>Upload</p></Button>
      {file.length>0 && <ul>
                          <h4>Uploading</h4>
                          {file.map((f, index) => {
                            return (
                              <li key={`${f.name}-${index}`}>
                                <div className='flex items-center gap-3'>
                                  
                                  <div>
                                    {f.name}
                                  </div>
                                  <Image src='/spinner.png' alt="loader" width={24} height={24} className="ml-2 animate-spin"/>
                                </div>
                                <p onClick={(e)=>handleRemoveFile(e,f.name)}>X</p>
                              </li>
                            )
                          })}
                          
        
                        </ul>}
      
    </div>
  )
}

export default FileUploader