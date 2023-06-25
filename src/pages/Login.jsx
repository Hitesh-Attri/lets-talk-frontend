import React from 'react'
import Add from '../../img/photoAddIcon.png'

export const Login = () => {
  return (
    <div className="formContainer">

      <div className="formWrapper">
        <span className='logo'>Chat-App</span>
        <span className='title'>Login</span>
        <form>
          <input type='text' placeholder='Username' />
          <input type='password' placeholder='Password' />
          <button>Login</button>
        </form>
        <p>Don't have an account? <span className="goto">Sign Up</span></p>
      </div>

    </div>
  )
}
