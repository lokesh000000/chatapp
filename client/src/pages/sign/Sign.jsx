import React from 'react'
import { Gender } from './Gender'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useSignup from '../../Hooks/useSignup'

const Sign = () => {

  const [inputs, setInputs] = useState({
		fullname: '',
		username: '',
		password: '',
		confirmpassword: '',
		gender: ''
	});

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };
  const { loading, signup } = useSignup();

  	const handlesubmit = async (e) => {
  		e.preventDefault();
      await signup(inputs)
    

  	};

  return (
    <div className=' flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className=' w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    <h1 className=' text-3xl font-semibold text-center text-gray-300'> Signup
      <span className='text-green-500'>  Chattify</span>
    </h1>
    
    <form  onSubmit={handlesubmit}>
      <div>
                
        <label className='label p-2'>
        <span className=' text-base label-text  text-gray-300'> fullname</span>
        </label>
        <input type="text"  placeholder='Enter Your fullName' className=' w-full input input-bordered h-10' 
        value={inputs.fullname} onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })} />


        <label className='label p-2'>
        <span className=' text-base label-text  text-gray-300 '> Username</span>
        </label>
        <input type="text"  placeholder='Enter Your username' className=' w-full input input-bordered h-10' value={inputs.username}  onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />


        <label className='label p-2 '>
        <span className=' text-base label-text  text-gray-300'> Password</span>
        </label>
        <input type="text"  placeholder='Enter Your password' className=' w-full input input-bordered h-10' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />


        <label className='label p-2'>
        <span className=' text-base label-text  text-gray-300 '> Confirmpasssword</span>
        </label>
        <input type="text"  placeholder='re - enter password' className=' w-full input input-bordered h-10' value={inputs.confirmpassword} onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })}/>

        <Link to={'/login'} className=' text-sm hover:underline hover:text-green-500 mt-2 inline-block  text-gray-300'>
        {"already"} have a account?
        </Link>
      </div>
    <Gender onCheckboxChange={handleCheckboxChange}
     selectedGender={inputs.gender} />
    <div>
      <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}> {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}</button>
    </div>
    </form>
    </div>
    
        </div>
  )
}

export default Sign