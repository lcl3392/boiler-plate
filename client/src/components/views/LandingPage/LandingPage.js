import React,{useEffect} from 'react'
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './LandingPage.css'

function LandingPage() {
    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => console.log(response))
    },[])
    return (
      <div>
        <Header/>
        <div className='LandingPage'>
         <img src="https://i.pinimg.com/564x/25/be/9f/25be9fb96bc86ad37f0af50f52e1afab.jpg" alt="" />
          <h2>We welcome your visit.</h2>
          </div>
          <Footer/>
      </div>
  )
}

export default LandingPage
