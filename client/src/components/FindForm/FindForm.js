import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FindForm.scss';
import { Link } from 'react-router-dom';
import { languages } from './availableLanguages';

const server_url = 'https://localhost:44330/home';

export const FindForm = () => {
  const [token, setToken] = useState('');
  const [keyword, setKeyword] = useState('');
  const [pageNumbers, setPageNumbers] = useState(0);
  const [language, setLanguage] = useState('');
  const [resData, setResData] = useState('');

  const testReq = () => {

    const convertLanguage = language.toLocaleLowerCase();

    if (!languages.includes(convertLanguage)) {
      alert('You have to specify correct type of language');
    };


    // const instance = axios.create({
    //   baseURL: '',
    //   withCredentials: false,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //     Authorization: token,
    //   },
    // });

    // instance
    //   .post('https://localhost:44330/home', {
    //     keyword,
    //     pageNumbers: parseInt(pageNumbers),
    //     language,
    //   })
    //   .then((response) => {
    //     setResData(response.data);
    //     console.log('data', response.data);
    //   })
    //   .catch((error) => console.log(error));
  };

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem('user'));
    setToken(current_user.access_token);
  }, []);

  return (
    <div className="wrapper">
      <div className="menu">
        <p className="menuHomeBtn">
          <Link to="/home" className="menuHomeLink"> Home </Link>
        </p>
        <p className="menuHomeBtn">
          <Link to="/repositories" className="menuHomeLink"> Repositories </Link>
        </p>
      </div>
      <div className="content">
        <div>
          <img id = 'addToDoPicture' src={`${process.env.PUBLIC_URL}/main44.png`} alt="logo"/>
        </div>
        <p id = 'findFormTitle'> find everything and even more </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <p> <input className = 'findFormInput' placeholder = 'Enter keyword for searching' value={keyword} onChange={(e) => setKeyword(e.target.value)}/> </p>
          <p> <input className = 'findFormInput' placeholder = 'Enter number of page' value={pageNumbers} onChange={(e) => setPageNumbers(e.target.value)} /> </p>
          <p> <input className = 'findFormInput' placeholder = 'Choose language' value={language} onChange={(e) => setLanguage(e.target.value)} /> </p>
        </form>
        <button id = 'findFormBtn' onClick={testReq}> Find </button>
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
