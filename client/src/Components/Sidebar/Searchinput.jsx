import React from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../Zustand/useConversation';
import { useState } from 'react';
import useGetConversations from '../../Hooks/useGetConversations';
import toast from 'react-hot-toast';


const Searchinput = () => {
  const [search ,setSearch] = useState('')
  const {setSelectedConversation} = useConversation()
  const {conversations} = useGetConversations();

  const handlesubmit = (e) => {
    e.preventDefault()
    if(!search){
      return
    }
    if(search.length < 3){
      return toast.error("search item must be atleast 4 charaacters long")
    }
    console.log(conversations)
    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation)
    }else{
      toast.error("user not found")
    }
  }
  return (
    <form className='flex items-center gap-2' onSubmit={handlesubmit}>

        <input type="text" placeholder='Search' className=' input input-bordered rounded-full' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button type='submit' className='btn btn-circle bg-green-500 text-white'><FaSearch /></button>
    </form>
  )
}

export default Searchinput