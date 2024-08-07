import React from 'react'
import Searchinput from './Searchinput'
import Conversations from './Conversation/Conversations'
import Logout from './logout/Logout'


const Sidebar = () => {
  return ( <div className=' border-r border-slate-400 flex flex-col p-4'>

 <Searchinput />
<div className='divider p-3'></div>
<Conversations />
<Logout />

  </div>

   

  )
}

export default Sidebar