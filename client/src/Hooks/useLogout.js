import axios from 'axios'
import  { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/Authcontext'

const useLogout =  () => {
    const {setAuthUser} = useAuthContext();
const [loading ,setLoading] =useState(false) 


const logout = async () => {
    console.log("workng")
try {
    setLoading(true)
   const result = await axios.post('/api/auth/logout',{
        Headers : {
            'Content-Type': 'application/json'
        }
    })
    const res = result.data;
    
        localStorage.removeItem("chat-user")
        setAuthUser(null)
    toast.success("Logged out successfully")
    
} catch (error) {
    toast.error(error)
    
}finally{
    setLoading(false)
}
}
return { loading ,logout}
}

export default useLogout