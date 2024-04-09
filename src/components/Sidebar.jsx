import React from 'react'
import './Sidebar.css';
import Mininav from './Mininav';
import Search from './Search';
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Mininav/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar;