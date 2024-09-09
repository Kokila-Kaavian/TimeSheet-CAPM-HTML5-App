import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ui5/webcomponents-react';

import './header.css';

const Header=()=> {
  const navigate = useNavigate();

  
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className='user-header'>
      <div className='header-icon'>
        <img id='logo' src="/images/smartsoftlogo.png" className="header-icon-logo" alt="Smartsoft Inc"/>
      </div>

      <div className='header-logout'>
        <Button onClick={handleLogout} className="logout-button" design="Default">Logout</Button>
      </div>
    </div>
  )
}

export default Header