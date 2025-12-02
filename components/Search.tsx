"use client";
import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getFiles } from '@/lib/actions/file.actions';
import Thumbnail from './Thumbnail';
import FormattedDateTime from './FormattedDateTime';
import { useDebounce } from 'use-debounce';
import { Document } from '@/types';


const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Document[]>([]);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [delayedQuery] = useDebounce(query,300);
  const router = useRouter();
  const path = usePathname();

  useEffect(()=>{
    const fetchFiles = async()=> {
      if (delayedQuery.length==0){
        setResults([]);
        setOpen(false);
        router.push(path.replace(searchParams.toString(),""));
      }
      const files = await getFiles({types:[],searchText:delayedQuery});
      setResults(files || []);
      setOpen(true);

    }
    fetchFiles();

  },[delayedQuery]);

  useEffect(()=>{
    if(!searchQuery){
      setQuery("");
    }
  },[searchQuery]);

  const handleClickItem = (file:Document)=> {
    setOpen(false);
    setResults([]);
    router.push(`/${(file.type === 'document') ? file.type + 's' : 'media'}?query=${query}`);

  }

  
  return (
    <div>
      <div>
       <Input value={query} placeholder='Search...' onChange={(e)=>setQuery(e.target.value)}/>
       {open && (<ul>
                    {results.length>0 ? (
                      results.map((file)=>(<li className='flex items-center justify-between' key={file.id}
                                               onClick={()=>handleClickItem(file)}>
                        <div className='flex cursor-pointer items-center gap-4'>
                          <Thumbnail type={file.type} extension={file.extension} url={file.url} className='size-9 min-w-9'/>
                          <p className='line-clamp-1'>{file.name}</p>
                        </div><FormattedDateTime date={file.createdAt} className='line-clamp-1'/>

                        </li>))
                    ):(<p>No results</p>)}

                 </ul>)}
      </div>
    </div>
  )
}

export default Search