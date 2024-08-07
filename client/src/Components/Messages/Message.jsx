import React from 'react'
import Messag from '../Messages/Messag.jsx'
import useGetmessage from '../../Hooks/useGetmessage.js'
import Messageskeleton from '../../skeletons/Messageskeleton.jsx'
import { useEffect , useRef } from 'react'
import useConversation from '../../Zustand/useConversation.js'
import useListenmessages from '../../Hooks/useListenmessages.js'

const Message = () => {
  const {loading , messages} = useGetmessage();
  const {selectedConversation } = useConversation();



 useListenmessages();
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation,messages]);

    
  return (

    <div className='px-4 flex-1 overflow-auto'>

     {!loading &&
	      messages.length > 0 &&
	      messages.map((message) => (
          <div key={message._id} >
			      <Messag message={message} />
          </div>

	   ))} 
    <div ref={messagesEndRef} />


      {loading && [...Array(3)].map((_, idx) => <Messageskeleton key={idx} />)}
    {!loading && messages.length === 0 && (
	    <p className='text-center text-white '>Send a message to start the conversation</p>
)}

</div>
  )
}

export default Message