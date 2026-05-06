import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { sortTypes } from "../constants";
import { useLocation, useNavigate } from "react-router-dom"
import { useRefresh } from '../context/RefreshContext'
const Sort = () => {
  const { triggerRefresh } = useRefresh()
  const router = useNavigate();
  const path = useLocation().pathname;
  const handleSort = (value:string)=> {
    router(`${path}?sort=${value}`)
    triggerRefresh()
  }
  
  return (
   <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={sortTypes[0].value} />
    </SelectTrigger>
    <SelectContent>
      {sortTypes.map((sort)=>(<SelectItem value={sort.value} key={sort.label}>{sort.label}</SelectItem>))}
    </SelectContent>
   </Select>
  )
}

export default Sort
