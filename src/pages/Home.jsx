import React from 'react'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import Chat from '../components/Chat'
import Messages from '../components/Messages'

const Home = () => {
  return (
    <div className='home'>
      <div className="home-container">
        <LeftSidebar />
        {/* <Messages /> */}
        <Chat />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home