'use client';
import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import { Files } from 'lucide-react';
import Thumbnail from './Thumbnail';



const FileUploader = ({OwnerId, AccountId, className}:{OwnerId:string;AccountId:string;className?:string}) => {
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles:File[]) => {
    setFile(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />
      <Button type='button' className={cn('uploader-button', className)}><p>Upload</p></Button>
      {file.length>0 && <ul>
                          <h4>Uploading</h4>
                          {file.map((f, index) => {
                            const { type, extension} = getFileType(f.name);
                            return (
                              <li key={`${f.name}-${index}`}>
                                <div className='flex items-center gap-3'>
                                  <Thumbnail type={type} extension={extension} url={convertFileToUrl(f)}/>
                                  <div>
                                    {f.name}
                                  </div>

                                </div>

                              </li>
                            )
                          })}
                          
        
                        </ul>}
      
    </div>
  )
}

export default FileUploader