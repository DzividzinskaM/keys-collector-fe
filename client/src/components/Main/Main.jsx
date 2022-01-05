import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.scss';
import { Link } from 'react-router-dom';

const proxy_url = 'http://localhost:5000/github';

export const Main = () => {
  const [user_id, setUserId] = useState('');
  const [login, setLogin] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [github_page, setGitHub_Page] = useState('');

  const [avatarUrl, setAvatarUrl] = useState('');
  const [reposUrl, setreposUrl] = useState('');

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const newUrl = url.split('?code=');
      const data = {
        code: newUrl[1],
      };

      axios.post(proxy_url, data).then((response) => {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
      });
    }
    const current_user = JSON.parse(localStorage.getItem('user'));
    setUserId(current_user.id);
    setLogin(current_user.login);
    setUsername(current_user.name);
    setEmail(current_user.email);
    setGitHub_Page(current_user.html_url);
    setAvatarUrl(current_user.avatar_url);
    setreposUrl(current_user.repos_url);
  });

  return (
    <div className='wrapper'>
      <div className='menu'>
        <p className='menuHomeBtn'>
          <Link to='/home' className='menuHomeLink'> Home </Link>
        </p>
        <p className='menuHomeBtn'>
          <Link to='/repositories' className='menuHomeLink'> Repositories </Link>
        </p>
      </div>
      <div className='profile'>
        <img src={avatarUrl} className='profileImg' />
        <p> Welcome, {username} </p>
        <div className='profileInfo'>
          <div className='profileInfoText'> ID </div> <div> {user_id} </div>
        </div>
        <div className='profileInfo'>
          <div> Login </div> <div> @{login} </div>
        </div>
        <div className='profileInfo'>
          <div> Github page </div>{' '}
          <a href={github_page} className='profileInfoLink'>
            {' '}
            user in github{' '}
          </a>
        </div>
        <div className='profileInfo'>
          <div> Email </div> <div> {email} </div>
        </div>
      </div>
    </div>
  );
};
