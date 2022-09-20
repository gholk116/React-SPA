import './App.css';
import React from 'react';
import Login from './components/loginPage/Login.js';
import profile from './assets/userIcon.png';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Resource from './components/resourcePage/Resource';
import Project from './components/projectPage/Project';
import Formula from './components/formulaPage/Formula';
import Template from './components/templatePage/Template';
import PrivateRoutes from './utils/PrivateRoute';

function App() {
  const navigate = useNavigate();
  const handleDropdown = () => {
    navigate('/');
    localStorage.clear();
  }

  return (
    <div className="App">

        <div className="header">
          <h1>Resource Management</h1>
          <img src={profile} alt="" onClick={handleDropdown}/>
          <div className="dropdown-content">
            <label>{localStorage.getItem('username')}</label>
            {/* <input type="submit" value="Logout" onClick={localStorage.clear()}/> */}
          </div> 
        </div>
        <nav>
          <Link to="/resource">Resource</Link>
          <Link to="/project">Project</Link>
          <Link to="/formula">Formula</Link>
        </nav>
        <div className='component'>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path="/" element={<Navigate to={"/resource"} replace />} />
              <Route path="/resource" element={<Resource/>}/>
              <Route path="/project" element={<Project/>}/>
              <Route path="/formula" element={<Formula/>}/>
              <Route path="/template" element={<Template/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Resource />}/>
          </Routes>
        </div>

    </div>
  );
}
export default App;
