import React from 'react';
import style from './Navbar.module.css';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"
import { auth } from "../config/Firebase"
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfoLocalStorage = localStorage.getItem('userAuth');
  const userInfo = JSON.parse(userInfoLocalStorage);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userAuth');
      console.log("Logout succes");
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${"container"} ${style.topBar}`}>
      <div className={`${"row align-items-center"}`}>
        {localStorage.getItem('userAuth') === null || userInfo.email === "" ?
          <>
            <div className={`${"col-md-2 col-10"}`}>
              <a href="/"><img src={logo} alt="SwiftBook" /></a>
            </div>
            <div className={`${"col-md-8 col-2"}`}>
              <button className={`${"collapsed hide-desktop"}`}
                type="button"
                data-toggle="collapse"
                data-target="#navbar"
                aria-controls="navbar"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className={`${"fa fa-bars"}`}></span>
              </button>
              <div id="navbar" className={`${"navbar-collapse collapse show"} ${style.topBar__nav}`}>
                <a href="#about">About</a>
                <a href="#steps">How it works</a>
                <a href="#price">Pricing</a>
                <a href="#">Contact</a>
                <a className={`${"hide-desktop"}`} href="/login">Start</a>
              </div>
            </div>
            <div className={`${"col-md-2 col-12"} ${style.topBar_cta}`}>
              <a href="/login">Start</a>
            </div>
          </> :
          <>
            <div className={`${"col-6"}`}>
              <a href="/"><img src={logo} alt="SwiftBook" /></a>
            </div>
            <div className={`${"col-6 text-end"} ${style.topBar_cta}`}>
              <a href="/dashboard">Dashboard</a>
              <button onClick={logout}>Log out</button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;