import React from 'react'

const Search = () => {
  return (
    <div  className='search'>
      <div className="searchForm">
        <input type="text" name="" id="" placeholder='Search...' />
      </div>
      <div className="userChat">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0IonFx6vtwTyLZ24AxRGHX98sTFWoMuiLTg&usqp=CAU" alt="profile after dark" />
        <div className="userChatInfo">
          <span>After Dark</span>
          <p>This is a message</p>
        </div>
      </div>
    </div>
  )
}

export default Search