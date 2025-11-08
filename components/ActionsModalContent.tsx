import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import { ShareProps } from '@/types'
import { Input } from './ui/input'
import { Button } from './ui/button'

const ImageThumbnail = ({ file }:{ file: Models.Document })=>(
    <div>
        <Thumbnail type={file.Type} extension={file.Extension} url={file.Url}/>
        <div className='flex flex-col'>
            <p>{file.Name}</p>
            <FormattedDateTime date={file.$createdAt} className='caption'/>

        </div>
    </div>
)

const DetailRow = ({label, value}:{label:string,value:string})=>(
    <div className='flex'>
        <p className='text-left'>{label}</p>
        <p className='text-left'>{value}</p>
    </div>
)

export const FileDetails = ({ file }:{ file: Models.Document }) => {
  return (
    <>
        <ImageThumbnail file={file} />
        <div>
            <DetailRow label="Format:" value={file.Extension} />
            <DetailRow label="Size:" value={file.Size} />
            <DetailRow label="Owner:" value={file.Owner} />
            <DetailRow label="Last edit:" value={file.$updatedAt} />
        </div>
    </>
  )
}

export const ShareInput = ({file,onInputChange,onRemove}:ShareProps) => {
  return (
    <>
        <ImageThumbnail file={file} />
        <div>
            <p>Share File</p>
            <Input type='email' 
                   placeholder='Enter email adress' 
                   onChange={e=>onInputChange(e.target.value.trim().split(','))} />
            <div className='pt-4'>
                <div className='flex justify-between'>
                    <p>Shared With</p>
                    <p>{file.Users.length} users</p>
                </div>
                    <ul className='pt-2'>
                        {file.Users.map((email:string)=>(
                            <li key={email} className='flex items-center justify-between gap-2'>
                                <p>{email}</p>
                                <Button onClick={()=>onRemove(email)}>Remove</Button>

                            </li>
                        ))}

                    </ul>

            </div>
        </div>
    </>
  )
}