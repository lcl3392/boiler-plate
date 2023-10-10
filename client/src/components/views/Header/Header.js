import React from 'react'
import './Header.css'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
       <header className="header">
            <div className="inner">
                <h1><Link to="/boiler-plate"><img src="https://i.pinimg.com/564x/79/91/e4/7991e4c4eb48d66c21443e9b5434267d.jpg" alt="" /></Link></h1>
                <NavBar />
            </div>
        </header>
    </div>
  )
}

export default Header
