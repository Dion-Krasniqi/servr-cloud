import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { Button } from '@/components/ui/button';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import { signOutUser } from '@/lib/actions/user.actions';
import { getFileTypeParams } from '@/lib/utils';
import { Document, FileType, SearchParamProps } from '@/types';
import { SearchParams } from 'next/dist/server/request/search-params'
import { Models } from 'node-appwrite';

const Page = async({ searchParams, params } : SearchParamProps) => {

  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const type = ((await params)?.type as string) || "";
  if (type!='user'){
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
            {files.rows.map((file:Document)=>{
                return (<Card key={file.id} file={file}/>)
            })}
        </section>

     </div>)}
  //maybe make this its own, but works fine for now
  else {
    return (<div>
             <p>Account Preferences</p>
             <p>Setting 1</p>
             <p>Setting 2</p>
             <p>Setting 3</p>
             <form className='self-center' action={async()=>{'use server';await signOutUser();}}>
                <Button type='submit' className='text-sm'>Sign Out</Button>
            </form>
            </div>)
  }
}

export default Page