import useConversation from '../../../Zustand/useConversation';
import { useSocketContext } from '../../../Context/Socketcontext';


const Conversation = ({conversation , emoji,lastIdx}) => {
    console.log(conversation);

    const {selectedConversation ,setSelectedConversation} = useConversation()

    const selected = selectedConversation?._id === conversation._id;

    const {onlineUsers} = useSocketContext();
    const isonline = onlineUsers.includes(conversation._id);
  



  return (
    <>
 
           <div
				className={`flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer
				${selected ? "bg-green-500" : ""}
			            `}
				onClick={() => setSelectedConversation(conversation)}
			>
        
        <div className={`avatar ${isonline ? "online" : ""}`}>
        <div className=' w-12 rounded-full '>
            <img src={conversation.profilepic} alt="" />
        </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>
                    <span className='text-xl'>
                       {conversation.fullname}
                    </span>
                </p>
                <span className='text-xl'>{emoji}</span>
            </div>
        </div>
       
     
    </div>

    {!lastIdx && <div className='divider my-0 py-0 h-1' />}
     </>
  )
}

export default Conversation