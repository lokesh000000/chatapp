import React from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../Hooks/useLogin';
import { useState } from 'react';

const Login = () => {

  const [username, setUsername] = useState("");


    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();


const handlesubmit = async(e) => {
	e.preventDefault();
  await login(username,password)
  
};

  return (
    <div className=' flex flex-col items-center justify-center min-w-96 mx-auto'>
<div className=' w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
<h1 className=' text-3xl font-semibold text-center text-gray-300'> Login 
  <span className='text-green-500'>  Chattify</span>
</h1>

<form onSubmit={handlesubmit}>
  <div>
    <label className='label p-2'>
    <span className=' text-base label-text  text-gray-300 '> USername</span>
    </label>
    <input type="text"  placeholder='Enter Your username' className=' w-full input input-bordered h-10' value={username} onChange={(e)=>setUsername(e.target.value)}/>
    <label className='label p-2'>
<span className=' text-base label-text  text-gray-300'> Password</span>
</label>
<input type="text"  placeholder='Enter Your passsword' className=' w-full inputinput-bordered h-10'  value={password} onChange={(e)=>setPassword(e.target.value)} />
<Link to={'/signup'} href="#" className=' text-sm hover:underline  text-gray-300 hover:text-green-500 mt-2 inline-block'>{"Dont"} have a account?</Link>
  </div>


<div>
<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}> {loading ? <span className='loading loading-spinner'></span> :"Login"}</button>
</div>
</form>
</div>

    </div>
  )
}

export default Login