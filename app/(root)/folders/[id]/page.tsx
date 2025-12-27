import Card from "@/components/Card";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { Document, FileType, SearchParamProps} from "@/types";




const Page = async({ params } : SearchParamProps) => {
  const id = ((await params)?.id as string) || "";
  const files  = await getFiles({types:[], limit:10, folder:id});
  const name = files[0].file_name;
    return (
     <div style={{backgroundColor:'#e0e0e0ff', borderRadius:10, padding:10}}>
        <section className='w-full'>
            <h1 className='h1 capitalize'>
              {name}
            </h1>    
        {files.length>0 ? (<div>
          <section className='flex md:flex-col gap-4 sm:flex-row'>
            {files?.map((file:Document)=>{return (<Card key={file.file_id} file={file}/>)})}
          </section></div>):
          (<div className="flex h-full w-full items-center justify-center">
            <p className="text-lg font-medium my-15">No files found</p>
           </div>)}
           </ section>
     </div>)
}

export default Page;
