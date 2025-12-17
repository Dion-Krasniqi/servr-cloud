import { cn, getFileIcon } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

const Thumbnail = ({type, extension, url='', className, imageClassName}
                  :{type:string;extension:string;url?:string, className?:string, imageClassName?:string}) => {

  const isImage = (type=='media');
  return (
    <figure className={className}><img src={isImage ? url : getFileIcon(extension, type)} 
                                  alt='thumbnail' 
                                  width={100} 
                                  height={100} className={cn('size-8 object-contain',imageClassName)}></img></figure>
  )
}

export default Thumbnail