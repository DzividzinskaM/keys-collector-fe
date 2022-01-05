import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Auth.scss';

const apiUrl = 'http://localhost:5000/user';

export const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false);

  const auth = (username, password) => {
    const data = {
      username,
      password,
    };
    if (username.length === 0 || password.length === 0) {
      setError(true);
    } else {
      axios
        .post(apiUrl, data)
        .then((response) => {
          const status = response.status;
          if (status === 201) {
            console.log('TEST');
            setSignUp(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (signUp) {
    return <Redirect to='/profile' />;
  }

  return (
    <div className='wrappingForm'>
      <div className='authForm'>
        <p> Sign up </p>
        <input
          placeholder='username'
          className='authFormInpt'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder='password'
          type='password'
          className='authFormInpt'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='authFormBtn'
          onClick={() => auth(username, password)}
        >
          {' '}
          Sign up{' '}
        </button>
        {error && (
          <p className='signUpFormError'>
            {' '}
            Username or password cannot be empty string{' '}
          </p>
        )}
      </div>
    </div>
  );
};
