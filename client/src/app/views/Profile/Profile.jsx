import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.scss';

export const Profile = () => {
  return (
    <div>
      <div className='wrapper'>
        <div className='menu'>
          <p className='menuHomeBtn'>
            <Link to='/home' className='menuHomeLink'> Home{' '} </Link>
          </p>
          <p className='menuHomeBtn'>
            <Link to='/repositories' className='menuHomeLink'>
              {' '}
              Repositories{' '}
            </Link>
          </p>
        </div>
        <div className='profile'>
          <div className='connect'>
            <a
              className='connectLink'
              href='https://github.com/login/oauth/authorize?client_id=c4af08eee8ad81aa9485&redirect_uri=http://localhost:3000/home'>
              auth with github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
