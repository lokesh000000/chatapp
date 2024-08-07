import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import useSendmessage from '../../Hooks/useSendmessage';

const MessageInput = () => {

	const {loading ,sendmessage } = useSendmessage()
	const [message ,setmessage] =  useState('')
	const handlesubmit = async(e) =>{

		e.preventDefault();
		if(!message){		
				return;
			}
		await sendmessage(message);
		
		setmessage('')
	}
  return (
    <form className='px-4 my-3' onSubmit={handlesubmit}>
	<div className='w-full relative'>
		<input
			type='text'
			className='border text-sm rounded-lg block w-full p-2.5  bg-slate-200 border-gray-600 '
			placeholder='Send a message'
			value={message}
			onChange={
				(e)=>setmessage(e.target.value)
			}
		/>
		<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' >
			{!loading ? (<BsSend />) : "" }
		</button>
	</div>
</form>
  )
}

export default MessageInput