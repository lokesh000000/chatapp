import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar.jsx'
import MessaageContainer from '../../Components/Messages/MessaageContainer.jsx'

const Home = () => {
  return (
    <div  className=' flex sm:h-[450px] md:h-[550px] overflow-hidden rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>

        <Sidebar />
     <MessaageContainer />
      
    </div>
  )
}

export default Home