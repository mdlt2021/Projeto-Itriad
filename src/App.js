import React, { Fragment , useEffect, useState} from "react";
import "./index.css"

import {FetchDefaultFromApi,BasicModal} from "./functions/functions.js"
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";


import logo from './logo.svg';
import './App.css';

export default function App2() {
  const [users, setUsers] = useState();
  const [productList, setProducts] = useState();
  const element = <h1>REACT STORE</h1>;
  const name = 'John Doe'
  return (
    <div className="App">
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        {element}
        <FetchDefaultFromApi/>
        
      </header>
    </div>
  );
}
