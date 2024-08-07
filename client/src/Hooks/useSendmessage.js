import  { useState } from 'react'
import useConversation from '../Zustand/useConversation'
import axios from 'axios';
import toast from 'react-hot-toast';

const useSendmessage = () => {
    const[loading,setLoading] =useState(false)
    const {messages ,setMessages, selectedConversation} = useConversation();


    const sendmessage = async(message)=>{

try {
    setLoading(true)
    const inpmessage = {message};
    const result = await axios.post(`/api/message/send/${selectedConversation._id}` ,inpmessage ,{
        headers:{    
          'Content-Type': 'application/json'
        }
    })
    const res = result.data

    if (result.status !== 200) {
        throw new Error(res.error || 'Login failed');
    }
    setMessages([...messages,res])
    console.log(res)
    
} catch (error) {
    toast.error(error.response?.data?.error || error.message);
 
    
}finally{
    setLoading(false)
}
}
return{sendmessage , loading}
}

export default useSendmessage