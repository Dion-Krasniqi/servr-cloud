import Card from "@/components/Card";
import PChart from "@/components/PieChart";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { Document } from "@/types";


const Dashboard = async()=> {
    const [ files, totalSpace ] = await Promise.all([getFiles({types:['home'], limit:10}), getTotalSpaceUsed([])]);
    return (
    <div className="">
      <div style={{padding:10}} className="flex flex-row gap-4">
        
        <section style={{backgroundColor:'#e0e0e0ff', padding:10, borderRadius:10}} className="w-[50%]"> 
            {files.length>0 ? (<div><div className="mb-4">
                <p>Latest Files</p>
                <p className='hidden sm:block'>Sort by:</p>
                <Sort />
            </div>
            <section className="flex flex-col gap-2">
              {files?.map((file:Document)=>{
                return (<Card key={file.file_id} file={file}/>)
            })}
            </section></div>):(<div className="flex h-full w-full items-center justify-center">
                                <p className="text-lg font-medium">No files found</p>
                               </div>)}
        </section>
        <section className='w-[50%]'>   
            <div style={{backgroundColor:'#e0e0e0ff', padding:10, borderRadius:10}}>
                <PChart item1={totalSpace.used/1024} 
                        item2={totalSpace.all/1024} 
                        />
                
            </div>
        </section>  

    </div>
      
    </div>
  );
}

export default Dashboard