// import Axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {loginUser} from '../../../_actions/user_action';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './LoginPage.css'

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email,setEmail] = useState("")
  const [Password,setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // console.log('Email', Email)
    // console.log('Password', Password)

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {                    //렌딩페이지로 이동
        if (response.payload.loginSuccess) {
          navigate('/');
        } else {
          alert('아이디와 패스워드를 입력해주세요.');
        }
    })

   
  }

  return (
    <div>
      <Header/>
      <div className='LoginPage'>
     <form style={{display:'flex', flexDirection:'column'}}
     onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input type='email' value={Email} onChange={onEmailHandler} />
          <label>Password</label>
          <input type='password' value={Password} onChange={onPasswordHandler} />
          <br/>
          <div className='LoginPage_btn'>
          <button type='submit'>Login</button>
          <Link to="/register"><button className="signup-button">Sign Up</button></Link>
          </div>
     </form>
     </div>
     <Footer/>
    </div>
  )
}

export default LoginPage
