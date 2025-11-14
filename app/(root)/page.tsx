import Card from "@/components/Card";
import PChart from "@/components/PieChart";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";


const Dashboard = async()=> {
   const [ files, totalSpace ] = await Promise.all([getFiles({types:[], limit:10}), getTotalSpaceUsed()]);
  return (
    <div className="">
      <div style={{padding:10}} className="flex flex-row gap-4">
        
        <section style={{backgroundColor:'#b7b7b7ff', padding:10, borderRadius:10}} className="w-[50%]"> 
            <div>
                <p>Latest Files</p>
                <p className='hidden sm:block'>Sort by:</p>
                <Sort />
            </div>
            {files.rows.map((file:Models.Document)=>{
                return (<Card key={file.$id} file={file}/>)
            })}
        </section>
        <section className='w-[50%]'>   
            <div style={{backgroundColor:'#b7b7b7ff', padding:10, borderRadius:10}}>
                <p>Total:<span>{totalSpace.used} / {totalSpace.all} MB</span></p>
                <PChart item1={totalSpace.document.size} 
                        item2={totalSpace.image.size} 
                        item3={totalSpace.video.size} 
                        item4={totalSpace.audio.size} 
                        item5={totalSpace.other.size}/>
                
            </div>
        </section>  

    </div>
      
    </div>
  );
}

export default Dashboard