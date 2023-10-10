import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';


// import Auth from './hoc/auth';

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={Auth(LandingPage, null)()} />
        <Route path="/login" element={Auth(LoginPage, false)()} />
        <Route path="/register" element={Auth(RegisterPage, false)()} />
      </Routes> */}
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </div>
  );
}

export default App;
