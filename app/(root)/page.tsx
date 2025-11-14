import Card from "@/components/Card";
import PChart from "@/components/PieChart";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";


const Dashboard = async()=> {
   const [ files, totalSpace ] = await Promise.all([getFiles({types:[], limit:10}), getTotalSpaceUsed()]);
  return (
    <div className="center">
      <div style={{backgroundColor:'#b7b7b7ff'}}>
        <section className='w-full'>   
            <div className='total-size-section'>
                <p>Total:<span>{totalSpace.used} / {totalSpace.all} MB</span></p>
                <PChart item1={totalSpace.document} item2={totalSpace.document} item3={totalSpace.document} item4={totalSpace.document} item5={totalSpace.document} item6={totalSpace.document}/>
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
      
    </div>
  );
}

export default Dashboard