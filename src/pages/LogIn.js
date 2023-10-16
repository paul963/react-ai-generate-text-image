import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import SocialLogin from '../components/SocialLogin';
import style from './LogIn.module.css';

import logo from '../assets/images/logo.png';

const LogIn = () => {
  // Define const for logged in function
  const [isLoggedin, setIsLoggedin] = useState(false);

  const navigate = useNavigate();
  const redirectToSignUp = () => {
    navigate('/sign-up');
  }

  // Define const for logged in user  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  });

  // Sing in with email and password
  const signIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const usersCollectionRef = collection(db, "users");
      const data = await getDocs(usersCollectionRef);
      data.docs.map((items) => {
        if (items.data().id === auth.currentUser.uid) {
          setUser({
            id: items.data().id,
            name: items.data().name,
            email: items.data().email
          });
          auth.currentUser.displayName = items.data().name;
        }
      });
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
      <div className={style.login__section}>
        <div className={`${"container"}`}>
          <div className={`${"row align-items-center"}`}>
            <div className={`${"col-lg-6 col-12"}`}>
              <div className={style.login__form}>
                <div className={style.form__logo}>
                  <a href="/"><img src={logo} alt="SwiftBook" /></a>
                </div>

                <div className={style.form__content}>
                  <h4>Login</h4>
                  <p>Use your credentials</p>
                  <form className={style.form__form} onSubmit={signIn}>
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
                    <button className={style.form__btn} type="submit">Login</button>
                  </form>
                </div>

                <div>
                  <p className={`${"text-center"}`}>Or continue with</p>
                  <SocialLogin />
                </div>

                <div className={style.form__footer}>
                  <button className={style.footer__btn} onClick={redirectToSignUp}>I don't have an account</button>
                </div>
              </div>
            </div>

            <div className={`${"col-lg-6 col-12"}`}>
              <div className={style.login__content}>
                <div className={style.content__text}>
                  <h1>Your generator for eBook ideas</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;