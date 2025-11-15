import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import { getFileTypeParams } from '@/lib/utils';
import { FileType, SearchParamProps } from '@/types';
import { SearchParams } from 'next/dist/server/request/search-params'
import { Models } from 'node-appwrite';

const Page = async({ searchParams, params } : SearchParamProps) => {

  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const type = ((await params)?.type as string) || "";
  const typeFilter = type!='documents' ? ['video','audio','image'] as FileType[] : ['document'] as FileType[];
  const types = getFileTypeParams(type) as FileType[];
  const [ files, totalSpace ] = await Promise.all([getFiles({types:typeFilter, limit:10}), getTotalSpaceUsed(typeFilter)]);
  return (
    <div style={{backgroundColor:'#b7b7b7ff'}}>
        <section className='w-full'>
            <h1 className='h1 capitalize'>
                {type}
            </h1>    
            <div>
                <p>Total:<span>{totalSpace.used} MB</span></p>
                <div>
                    <p className='hidden sm:block'>Sort by:</p>
                    <Sort />
                </div>
            </div>
        </section>  
        <section>
            {files.rows.map((file:Models.Document)=>{
                return (<Card key={file.$id} file={file}/>)
            })}
        </section>

    </div>
  )
}

export default Page