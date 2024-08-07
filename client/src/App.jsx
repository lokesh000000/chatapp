
import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/home/Home.jsx'
import Login from "./pages/login/Login.jsx"
import Sign from './pages/sign/Sign.jsx'
import {Navigate, Route ,Routes} from 'react-router-dom'
import { useAuthContext } from './Context/Authcontext.jsx'

function App() {

  const { authUser } = useAuthContext();

  return(

    <div className='p-4  h-screen flex items-center justify-center'>
      
    <Routes>
     <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      <Route path='/login' element={authUser ? <Navigate to='/' /> :<Login/>}/>
      <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Sign />} />
    </Routes>
    <Toaster />
  
    </div>
  )
}

export default App
