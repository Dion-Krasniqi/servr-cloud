"use client";
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getFiles } from '@/lib/actions/file.actions';
import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';
import FormattedDateTime from './FormattedDateTime';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const router = useRouter();
  const path = usePathname();

  useEffect(()=>{
    const fetchFiles = async()=> {
      if (!query){
        setResults([]);
        setOpen(false);
        router.push(path.replace(searchParams.toString(),''))
      }
      const files = await getFiles({searchText:query});
      setResults(files?.rows);
      setOpen(true);

    }
    fetchFiles();

  },[query]);

  useEffect(()=>{
    if(!searchQuery){
      setQuery("");
    }
  },[searchQuery]);

  const handleClickItem = (file:Models.Document)=> {
    setOpen(false);
    setResults([]);
    router.push(`/${(file.Type === 'document') ? file.Type + 's' : 'media'}?query=${query}`);

  }

  
  return (
    <div>
      <div>
       <Input value={query} placeholder='Search...' onChange={(e)=>setQuery(e.target.value)}/>
       {open && (<ul>
                    {results.length>0 ? (
                      results.map((file)=>(<li className='flex items-center justify-between' key={file.$id}
                                               onClick={()=>handleClickItem(file)}>
                        <div className='flex cursor-pointer items-center gap-4'>
                          <Thumbnail type={file.Type} extension={file.Extension} url={file.Url} className='size-9 min-w-9'/>
                          <p className='line-clamp-1'>{file.Name}</p>
                        </div><FormattedDateTime date={file.$createdAt} className='line-clamp-1'/>

                        </li>))
                    ):(<p>No results</p>)}

                 </ul>)}
      </div>
    </div>
  )
}

export default Search