import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { getFiles } from '@/lib/actions/file.actions';
import { getFileTypeParams } from '@/lib/utils';
import { FileType, SearchParamProps } from '@/types';
import { SearchParams } from 'next/dist/server/request/search-params'
import { Models } from 'node-appwrite';
import React from 'react'

const Page = async({ searchParams, params } : SearchParamProps) => {

  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const type = ((await params)?.type as string) || "";
  const types = getFileTypeParams(type) as FileType[];
  const files = await getFiles({types, searchText, sort});
  return (
    <div style={{backgroundColor:'#b7b7b7ff'}}>
        <section className='w-full'>
            <h1 className='h1 capitalize'>
                {type}
            </h1>    
            <div className='total-size-section'>
                <p>Total:<span>0MB</span></p>
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