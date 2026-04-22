import { cn, getFileIcon } from '../../lib/utils';

const Thumbnail = ({type, extension, url='', className, imageClassName}
                  :{type:string;extension:string;url:string|null, className?:string, imageClassName?:string}) => {

  const isImage = (type=='media');
  if (!url) url = '/'
  return (
    <figure className={className}><img src={isImage ? url : getFileIcon(extension, type)} 
                                  alt='thumbnail' 
                                  width={100} 
                                  height={100} className={cn('size-8 object-contain',imageClassName)}></img></figure>
  )
}

export default Thumbnail