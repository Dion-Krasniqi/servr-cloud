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
      if (!delayedQuery.trim()){
        setResults([]);
        setOpen(false);
        router.push(path);
        return;
      }
      const files = await getFiles({types:[],searchText:delayedQuery});
      setResults(files ?? []);
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
    router.push(`/${(file.file_type === 'document') ? file.file_type + 's' : 'media'}?query=${query}`);

  }

  
  return (
    <div>
      <div>
       <Input value={query} placeholder='Search...' onChange={(e)=>setQuery(e.target.value)}/>
       {open && (<ul>
                    {results.length>0 ? (
                      results.map((file)=>(<li className='flex items-center justify-between' key={file.file_id}
                                               onClick={()=>handleClickItem(file)}>
                        <div className='flex cursor-pointer items-center gap-4'>
                          <Thumbnail type={file.file_type} extension={file.extension} url={file.url} className='size-9 min-w-9'/>
                          <p className='line-clamp-1'>{file.file_name}</p>
                        </div>

                        </li>))
                    ):(<p>No results</p>)}

                 </ul>)}
      </div>
    </div>
  )
}

export default Search