import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'

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