import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import { Document, ShareProps } from '@/types'
import { Input } from './ui/input'
import { Button } from './ui/button'

const ImageThumbnail = ({ file }:{ file: Document })=>(
    <div>
        <Thumbnail type={file.type} extension={file.extension} url={file.url}/>
        <div className='flex flex-col'>
            <p>{file.name}</p>
            <FormattedDateTime date={file.createdAt} className='caption'/>

        </div>
    </div>
)

const DetailRow = ({label, value}:{label:string,value:string})=>(
    <div className='flex'>
        <p className='text-left'>{label}</p>
        <p className='text-left'>{value}</p>
    </div>
)

export const FileDetails = ({ file }:{ file: Document }) => {
  return (
    <>
        <ImageThumbnail file={file} />
        <div>
            <DetailRow label="Format:" value={file.extension} />
            <DetailRow label="Size:" value={String(file.size)} />
            <DetailRow label="Owner:" value={file.ownerName} />
            <DetailRow label="Last edit:" value={file.lastModified} />
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
                    <p>{file.sharedWith.length} users</p>
                </div>
                    <ul className='pt-2'>
                        {file.sharedWith.map((email:string)=>(
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