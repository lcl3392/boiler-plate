import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {registerUser} from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './RegisterPage.css'

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email,setEmail] = useState("")
  const [Name,setName] = useState("")
  const [Password,setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
      .then(response => {                    
        if (response.payload.success) {
          navigate('/login');
        } else {
          alert('내용을 입력해주세요.');
        }
    })

  }


  return (
    <div>
      <Header/>
      <div className='Register_visual'>
      <div className='Register_box'>
      <h2>Sign up</h2>
      <div className='RegisterPage'> 
     <form style={{display:'flex', flexDirection:'column'}}
     onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input type='email' value={Email} onChange={onEmailHandler} />
          
          <label>Name</label>
          <input type='text' value={Name} onChange={onNameHandler} />

          <label>Password</label>
          <input type='password' value={Password} onChange={onPasswordHandler} />

          <label>Confirm Password</label>
          <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
          <br/>
          <button className='join_btn' type='submit'>
          Join Membership
          </button>
     </form>
     </div>
     </div>
     </div>
     <Footer/>
    </div>
  )
}

export default RegisterPage
