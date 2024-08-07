import { useEffect } from 'react';
import { useSocketContext } from '../Context/Socketcontext';
import useConversation from '../Zustand/useConversation';
import notificationSound from '../sounds/notification.mp3'

const useListenmessages = () => {

    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
	   socket?.on("newMessage", (newmessage) => {
		newmessage.shouldShake = true;
		const sound = new Audio(notificationSound);
		sound.play();
		setMessages([...messages, newmessage]);
	});
	return () => socket?.off("newMessage");
}, [socket, setMessages, messages]);

}

export default useListenmessages