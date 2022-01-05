import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Repositories.scss';

export const Repositories = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem('user'));
    const user_repos_url = current_user.repos_url;

    if (user_repos_url) {
      axios.get(user_repos_url).then((response) => {
        setRepos(response.data);
      });
    }
  });
  return (
    <div className='wrapperRepos'>
      <div className='menu'>
        <p className='menuHomeBtn'>
          <Link to='/home' className='menuHomeLink'>
            {' '}
            Home{' '}
          </Link>
        </p>
        <p className='menuHomeBtn'>
          <Link to='/repositories' className='menuHomeLink'>
            {' '}
            Repositories{' '}
          </Link>
        </p>
      </div>
      <div className='profile'>
        {repos.map((rep) => (
          <div className='profileRepos'>
            <div className = 'profileReposWrapper'>
              <div> <p className='profileReposTitle'>Repository name: </p> </div>
              <div> <p className='profileReposName'> {rep.full_name} </p> </div>
            </div>
            <p>{rep.description} </p>
          </div>
        ))}
      </div>
    </div>
  );
};
