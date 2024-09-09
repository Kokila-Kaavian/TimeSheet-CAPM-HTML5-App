import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Form, FormGroup, FormItem, Input } from '@ui5/webcomponents-react';

import './login.css';
/**
 * Display the login component
 * @returns Login Component
 */
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // To handle login errors
  const navigate = useNavigate();

  // Function to handle the Login Action.
  const handleSubmit = async () => {
    try {
      // Fetch call URL
      let url = `${process.env.REACT_APP_SERVER_PREFIX}service/timesheet/login`;

      // Store the response from the backend api service.
      const response = await axios.post(url, {
        userName,
        password
      });

      // Store the token fetched from the database.
      const token = response.data.value.token;

      // Check whether if the token is available or not.
      if (token) {

        // Set the token in the local storage and navigate the corresponding page.
        localStorage.setItem('token', token);
        navigate('/user');
      } else {
        toast.error("Failed to set the token.");

      }
    } catch (error) {
      toast.error(`${error.response.data.error.message}`);
    }
  };

  // Handle the Show password.
  const handleToggle = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div className="center-container">
      <div className="form-container">
        <Form className='form-content' titleText='Smartsoft Timesheet Application'>
          <FormGroup titleText='Login' className='form-content-title'>
            <FormItem label="Email">
              <Input
                className='form-content-input'
                name='username'
                placeholder='Enter your email'
                value={userName}
                onInput={(e) => setUserName(e.target.value)}
              />
            </FormItem>

            <FormItem label="Password">
              <div className='password-container'>
                <Input
                  className='password-input'
                  name='password'
                  placeholder='Enter your Password'
                  value={password}
                  type={showPassword ? 'Text' : 'Password'}
                  onInput={(e) => setPassword(e.target.value)}
                />
                <Button className='password-icon' onClick={handleToggle} >
                  {showPassword ? (
                    <FaEyeSlash className='password-eye-icon' />
                  ) : (
                    <FaEye className='password-eye-icon' />
                  )}
                </Button>
              </div>
            </FormItem>
          </FormGroup>
        </Form>
        {error && <div className="error-message">{error}</div>}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button type='submit' design='Emphasized' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;