import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chat from './Chats'

const LeftSidebar = () => {
  return (
    <div className='leftSidebar'>
      <div className='leftSidebar-container'>
        <Navbar />
        <Search />
        <Chat />
      </div>
    </div>
  )
}

export default LeftSidebar