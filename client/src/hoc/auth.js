// import Axios from 'axios';
// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { auth } from '../_actions/user_action';
// import { useNavigate } from 'react-router-dom';

// export default function (SpecificComponent, option, adminRoute = null) {
  
//   //null   -> 아무나 출입 가능
//   //true   -> 로그인 유저만 출입 가능
//   //false  -> 로그인 유저는 출입 불가능

//   function AuthenticationCheck(props) {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//       dispatch(auth()).then(response => {
//         console.log(response);

//         // 로그인 하지 않은 상태
//         if (!response.payload.isAuth) {
//           navigate('/login');
//         } else {
//           // 로그인 상태
//           if (adminRoute && !response.payload.isAdmin) {
//             navigate('/');
//           } else {
//             // option이 null인 경우는 항상 출입 가능
//             if (option === false || option === null) navigate('/');
//           }
//         }
//       });
//     }, [navigate]);

//     return <SpecificComponent {...props}/>;
//   }

//   return AuthenticationCheck;
// }
