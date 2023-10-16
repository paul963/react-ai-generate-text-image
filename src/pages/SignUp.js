import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import SocialLogin from '../components/SocialLogin';
import style from './SignUp.module.css';

import logo from '../assets/images/logo.png';

const SignUp = () => {
  // Define const for logged in function
  const [isLoggedin, setIsLoggedin] = useState(false);

  const navigate = useNavigate();
  const redirectToLogIn = () => {
    navigate('/login');
  }

  // Define const for logged in user  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  });

  // Function add user details to users db if doesn't exist
  const emailExists = async (userEmail) => {
    const usersCollectionRef = collection(db, "users");
    const queryUsers = await getDocs(usersCollectionRef);
    const userFound = queryUsers.docs.some((userData) => userData.data().email === userEmail);
    if (!userFound) {
      console.log("Email new");
      await addDoc(usersCollectionRef, {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
      });
    } else {
      console.log("Email already exist");
    }
  }

  // Register with email and pass
  const signUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      auth.currentUser.displayName = name;
      setUser({
        id: auth.currentUser.uid,
        name: name,
        email: email
      });
      await emailExists(email);
      setIsLoggedin(true);
    } catch (error) {
      console.error(error);
    }
  }

  

  useEffect(() => {
    localStorage.setItem('userAuth', JSON.stringify(user));

    if (isLoggedin) {
      navigate('/ebook-form');
      setIsLoggedin(false);
    }
  }, [user]);

  return (
    <>
      <div className={style.signup__section}>
        <div className={`${"container"}`}>
          <div className={`${"row align-items-center"}`}>
            <div className={`${"col-lg-6 col-12"}`}>
              <div className={style.signup__form}>
                <div className={style.form__logo}>
                  <a href="/"><img src={logo} alt="SwiftBook" /></a>
                </div>

                <div className={style.form__content}>
                  <h4>Create your account</h4>
                  <p>Let's get started </p>
                  <form className={style.form__form} onSubmit={signUp}>
                    <input
                      className={style.form__input}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your full name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className={style.form__input}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className={style.form__input}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={style.form__btn} type="submit">Create account</button>
                  </form>
                </div>

                <div>
                  <p className={`${"text-center"}`}>Or continue with</p>
                  <SocialLogin />
                </div>

                <div className={style.form__footer}>
                  <button className={style.footer__btn} onClick={redirectToLogIn}>I have an account</button>
                  <p className={`${"text-center"}`}>by creating an account, you agree to our <br /><a href="#">Terms and Conditions</a></p>
                </div>
              </div>
            </div>

            <div className={`${"col-lg-6 col-12"}`}>
              <div className={style.signup__content}>
                <div className={style.content__text}>
                  <h1>Your generator for eBook ideas</h1>
                  <p>Our AI-powered generator assistant helps get your thoughts on paper, and much more.</p>
                </div>

                <div className={style.content__list}>
                  <div className={style['content__list-item']}>
                    <div className={`${"text-center"} ${style.item__check}`}>
                      <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.0501 13L0.350098 7.29998L1.7751 5.87498L6.0501 10.15L15.2251 0.974976L16.6501 2.39998L6.0501 13Z" fill="#048848" />
                      </svg>
                    </div>
                    <span className={style.item__title}>free access</span>
                  </div>
                  <div className={style['content__list-item']}>
                    <div className={`${"text-center"} ${style.item__check}`}>
                      <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.0501 13L0.350098 7.29998L1.7751 5.87498L6.0501 10.15L15.2251 0.974976L16.6501 2.39998L6.0501 13Z" fill="#048848" />
                      </svg>
                    </div>
                    <span className={style.item__title}>Instant access</span>
                  </div>
                  <div className={style['content__list-item']}>
                    <div className={`${"text-center"} ${style.item__check}`}>
                      <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.0501 13L0.350098 7.29998L1.7751 5.87498L6.0501 10.15L15.2251 0.974976L16.6501 2.39998L6.0501 13Z" fill="#048848" />
                      </svg>
                    </div>
                    <span className={style.item__title}>No setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;