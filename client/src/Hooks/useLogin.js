import axios from 'axios'
import  { useState } from 'react'

import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/Authcontext'

const useLogin = () => {

    const[loading  , setLoading] = useState(false)
    const {setAuthUser} = useAuthContext();

    const login = async(username , password) =>{
        try {
            setLoading(true)
            const inp = {username ,password}
            
            const result = await axios.post('/api/auth/login' , inp ,{
                headers :{
                    'Content-Type': 'application/json'
                }
            } )
            const res = result.data
            
            if (result.status !== 200) {
                throw new Error(res.error || 'Login failed');
            }

            console.log(res)

            toast.success('login successful!');
            localStorage.setItem("chat-user", JSON.stringify(res));
            setAuthUser(res)



          
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
            
            
        }finally{
            setLoading(false)
        }
    }
    return {loading , login}
}

export default useLogin