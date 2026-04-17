import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import { Document, ShareProps } from '@/types'
import { Input } from './ui/input'
import { Button } from './ui/button'

const ImageThumbnail = ({ file }:{ file: Document })=>(
    <div>
        <Thumbnail type={file.file_type} extension={file.extension} url={file.url}/>
        <div className='flex flex-col'>
            <p>{file.file_name}</p>
            <FormattedDateTime date={file.created_at} className='caption'/>

        </div>
    </div>
)

const DetailRow = ({label, value}:{label:string,value:string})=>(
    <div className='flex'>
        <p className='text-left'>{label}{value}</p>
    </div>
)

export const FileDetails = ({ file }:{ file: Document }) => {
  return (
    <>
        <div>
            <DetailRow label="Format: " value={file.file_type=='folder' ? 'Folder':file.extension} />
            <DetailRow label="Size: " value={`${String(file.size)}B`} />
            <DetailRow label="Owner: " value={file.owner_id} />
            <DetailRow label="Last edit: " value={file.last_modified} />
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