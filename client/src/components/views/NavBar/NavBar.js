import React from 'react'
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";

function NavBar() {

  const handleLogout = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          alert('로그아웃 하였습니다.'); 
            Navigate('/login');
          // 로그아웃이 성공한 경우
          console.log(response.data);
        } else {
          // 로그아웃이 실패한 경우
          alert('로그인을 해주세요.');
          console.error('로그아웃 실패');
        }
      })
      .catch(error => {
        console.error('로그아웃 요청 중 오류 발생', error);
      });
  };

  return (
    <nav className="nav">
    <ul>
    <li><Link to="/"><a>Home</a></Link></li>
    <li><Link to="/login"><a>Login</a></Link></li>
    <li><button onClick={handleLogout}>Logout</button></li>
    </ul>
    </nav>
  )
}

export default NavBar
