import { getFileIcon } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

const Thumbnail = ({type, extension, url=''}:{type:string;extension:string;url?:string}) => {

  const isImage = (type==='image' && extension != 'svg')
  return (
    <figure><Image src={isImage ? url : getFileIcon(extension, type)} 
                                  alt='thumbnail' 
                                  width={100} 
                                  height={100} className='size-8 object-contain'></Image></figure>
  )
}

export default Thumbnail