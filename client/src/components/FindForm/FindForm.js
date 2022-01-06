import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './FindForm.scss';
import { Link } from 'react-router-dom';
import { languages } from './availableLanguages';
import { test } from './test';
import { interval } from 'rxjs';
import { filter, take, map, Observable, from } from 'rxjs/operators';
import Axios from  'axios-observable';
import { data } from './dataForChart';
import { WebSocket } from 'websocket';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


const server_url = 'https://localhost:44330/home';

export const FindForm = () => {
  const [token, setToken] = useState('');
  const [keyword, setKeyword] = useState('');
  const [pageNumbers, setPageNumbers] = useState(0);
  const [language, setLanguage] = useState('');
  const [resData, setResData] = useState('');
  const [users, setUsers] = useState([]);
  const ws = useRef(null);

  const testReq = () => {

    const convertLanguage = language.toLocaleLowerCase();

    if (!languages.includes(convertLanguage)) {
      alert('You have to specify correct type of language');
    };

    const data = {
      keyword,
      pageNumbers: Number(pageNumbers),
      language,
    };

    const userInfo = JSON.parse(localStorage.getItem('user'));
    const accessToken = userInfo.access_token;

    console.log('work');

    axios.post('http://659e-109-229-30-204.ngrok.io/home/connect', data, { headers: { 'Authorization': accessToken}})
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });

  
    const source = new EventSource('http://659e-109-229-30-204.ngrok.io/home', { withCredentials: false });

    source.onopen = function (event) {
      console.log('open:');
    };
    
    source.onmessage = function (event) {
      document.getElementById('msg').innerHTML += '<h2>' + event.data + '</h2>';
    };

    source.onerror = function (e) {
      //console.log(e);
      console.error("⛔ EventSource failed: ", e);
      // console.log('message!');
      // console.log('error', e);

      // source.close();
    };

  //     this.setState({ ws: ws });

  //     that.timeout = 250; // reset timer to 250 on open of websocket connection 
  //     clearTimeout(connectInterval); // clear Interval on on open of websocket connection

  };
  


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
        <div className = 'chartResult'> 
        <ResponsiveContainer width = '100%' height = {500}>
        <LineChart data={data} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        >
          <CartesianGrid strokeDasharray="2 20" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div id = 'msg'> </div>
    </div>
  );
};
