import useConversation from '../Zustand/useConversation';
import axios from 'axios';
import { useState ,useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetmessage = () => {

    const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await axios.post(`/api/message/${selectedConversation._id}`);
                const result = res.data
				setMessages(result);

			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };

}

export default useGetmessage