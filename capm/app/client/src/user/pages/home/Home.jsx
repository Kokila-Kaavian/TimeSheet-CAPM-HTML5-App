import React from 'react'
import { Button, FlexBox, Label } from '@ui5/webcomponents-react'
import { useNavigate } from 'react-router-dom';

import './home.css';

const Home=()=> {
  const navigate = useNavigate();

  const handleNavigate = () =>{
    navigate('/user/timesheet')
  }

  return (
    <div className='home-main-container'>
      <div className='header'>
        <h1 className='heading'>WELCOME</h1>
      </div>
      <div className='menu'>
        <Button design='Emphasized' onClick={handleNavigate}>New Time Sheet Entry</Button>
      </div>

      <hr></hr>

      <div className='future-enhancement'>
        <Label>["Feature Coming Soon: Soon, you'll be able to view all submitted hours organized by date, month, and project right here. Stay tuned !"]</Label>
      </div>
    </div>
  )
}

export default Home