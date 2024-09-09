import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import Login from './login/login';
import TimeSheetDetails from './timesheet/TimeSheetDetails';
import User from './user/User';
import Home from './user/pages/home/Home';
import Profile from './my_Profile/MyProfile';

import './App.css';

const SessionRoute = ({'element': Component, ...rest}) => {
    const doesUserHaveSession = localStorage.getItem('token');
  
    const renderComponent = doesUserHaveSession || rest.publicRoute;

    return renderComponent ? (
      <>
        <Component {...rest}/></>
    ) : (
      <Navigate to='/'/>
    )
}

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
  
          <Route path='/user' element={<SessionRoute element={User} />}>
            <Route path='/user' element={<Home />} />
            <Route path='/user/timesheet' element={<TimeSheetDetails />} />
            <Route path ='/user/profile' element={<Profile/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
