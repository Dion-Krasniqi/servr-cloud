import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../lib/actions/user.actions'
import { useEffect, useState } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    
    useEffect(()=>{
        getCurrentUser().then(user => {
            if (!user) navigate('/sign-in')
            else setChecked(true)
        })
    }, [])

  
  if (!checked) return null // loader
  
  return <>{children}</>
}