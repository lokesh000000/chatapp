import { useState } from 'react'
import axios  from 'axios'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/Authcontext'


const useSignup = () => {
    const[loading , setLoading] = useState(false)

    const {setAuthUser} = useAuthContext();

 
	const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
		const success = handleInputErrors({ fullname, username, password, confirmpassword, gender });
		if (!success) return;

        try {
            setLoading(true)
            const inpdata = { fullname, username, password, confirmpassword, gender }
            const result = await axios.post('/api/auth/signup' , inpdata ,{
                headers: {
                    'Content-Type': 'application/json'
                }})
            const res = result.data
            console.log (res)
            toast.success('Signup successful!');
            localStorage.setItem("chat-user", JSON.stringify(res));
            setAuthUser(res)

        }
         catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                toast.error(`Error: ${error.response.data.message}`);
                console.error('Response error:', error.response);
            } else if (error.request) {
                // Request was made but no response received
                toast.error('No response received from server.');
                console.error('Request error:', error.request);
            } else {
                // Something else happened while setting up the request
                toast.error(`Error: ${error.message}`);
                console.error('Error:', error.message);
            }
         }
         
         finally {
             setLoading(false);
         }
            
        }
        return { loading , signup };

 
 
}


export default useSignup;

function handleInputErrors({ fullname, username, password, confirmpassword, gender }) {
	if (!fullname || !username || !password || !confirmpassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmpassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}