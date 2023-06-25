import React from 'react'
import PhotoAdd from '../../img/photoAddIcon.png'

const Input = () => {
  return (
    <div className="inputArea">
      <input type="text" placeholder='Message...' />
      <div className="send">
        <img src="https://img.icons8.com/ios/50/attach.png" alt="attach"/>
        
        <input type="file" style={{display:"none"}} id="file" />
        <label htmlFor="file">
          <img src={PhotoAdd} alt="" />
        </label>

        <button>Send</button>
      </div>
    </div>
  )
}

export default Input