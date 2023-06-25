import React from 'react'
import Camera from '../../img/video-camera.png'
import More from '../../img/more.png'
import Add from '../../img/add.png'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Buntyy</span>
        <div className="chatIcons">
          <img src={Camera} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>

      <Messages />

      <Input />
    </div>
  )
}

export default Chat