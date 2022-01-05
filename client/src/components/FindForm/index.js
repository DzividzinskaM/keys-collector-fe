import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FindForm.scss';
import { Link } from 'react-router-dom';

const server_url = 'https://localhost:44330/home';

export const FindForm = () => {
  const [token, setToken] = useState('');
  const [keyword, setKeyword] = useState('');
  const [pageNumbers, setPageNumbers] = useState(0);
  const [language, setLanguage] = useState('');

  const [resData, setResData] = useState('');

  const testReq = () => {
    console.log('token', token);
    console.log('language', language);
    const instance = axios.create({
      baseURL: '',
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: token,
      },
    });

    instance
      .post('https://localhost:44330/home', {
        keyword,
        pageNumbers: parseInt(pageNumbers),
        language,
      })
      .then((response) => {
        setResData(response.data);
        console.log('data', response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem('user'));
    setToken(current_user.access_token);
  }, []);

  return (
    <div className="wrapper">
      <div className="menu">
        <p className="menuHomeBtn">
          <Link to="/home" className="menuHomeLink">
            {' '}
            Home{' '}
          </Link>
        </p>
        <p className="menuHomeBtn">
          <Link to="/repositories" className="menuHomeLink">
            {' '}
            Repositories{' '}
          </Link>
        </p>
      </div>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            placeholder="number of page"
            value={pageNumbers}
            onChange={(e) => setPageNumbers(e.target.value)}
          />
          <input
            placeholder="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <button onClick={testReq}>Test</button>
        </form>
        {resData && (
          <div>
            {resData.totalCount}
            {resData.items.map(({ gitUrl }) => (
              <p>{gitUrl}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
