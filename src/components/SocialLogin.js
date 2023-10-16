import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider, twitterProvider, db } from "../config/Firebase"
import { signInWithPopup } from "firebase/auth"
import { collection, getDocs, addDoc } from "firebase/firestore";
import style from './SocialLogin.module.css';

const SocialLogin = (props) => {
  const navigate = useNavigate();

  // Define const for logged in function
  const [isLoggedin, setIsLoggedin] = useState(false);
  
  // Define const for logged in user 
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

  // Sing in with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setUser({
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
      });
      await emailExists(auth.currentUser.email);
      setIsLoggedin(true);
    }
    catch (error) {
      console.error(error);
    }
  }

  // Sing in with Facebook
  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      setUser({
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
      });
      emailExists(auth.currentUser.email);
      setIsLoggedin(true);
    } catch (error) {
      console.error(error);
    }
  }

  // Sing in with Twitter
  const signInWithTwitter = async () => {
    try {
      await signInWithPopup(auth, twitterProvider);
      setUser({
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
      });
      emailExists(auth.currentUser.email);
      setIsLoggedin(true);
    } catch (error) {
      console.error(error);
    }
  }

  // Register user name and email in local storage
  useEffect(() => {
    localStorage.setItem('userAuth', JSON.stringify(user));
  }, [user]);

  if (isLoggedin) {
    navigate('/ebook-form');
    setIsLoggedin(false);
  }

  return (
    <div className={style.social__btn}>
      <div className={style.btn__item} onClick={signInWithGoogle}>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.0003 12.7938C24.0003 11.9669 23.9203 11.1133 23.7869 10.3131H12.2371V15.0344H18.8522C18.5855 16.5548 17.7052 17.8885 16.3982 18.7421L20.346 21.8096C22.6666 19.649 24.0003 16.5015 24.0003 12.7938Z" fill="#4280EF" />
          <path d="M12.2369 24.7436C15.5445 24.7436 18.3186 23.65 20.3458 21.7828L16.3981 18.7419C15.3044 19.4888 13.8907 19.9156 12.2369 19.9156C9.03602 19.9156 6.34194 17.755 5.355 14.8742L1.30054 17.9951C3.38112 22.1296 7.59562 24.7436 12.2369 24.7436Z" fill="#34A353" />
          <path d="M5.35458 14.8477C4.84777 13.3272 4.84777 11.6735 5.35458 10.153L1.30012 7.00549C-0.433698 10.4731 -0.433698 14.5543 1.30012 17.9952L5.35458 14.8477Z" fill="#F6B704" />
          <path d="M12.2369 5.11156C13.9707 5.08488 15.6779 5.75173 16.9315 6.95207L20.4258 3.43109C18.2119 1.35051 15.2778 0.2302 12.2369 0.256874C7.59562 0.256874 3.38112 2.87093 1.30054 7.00542L5.355 10.153C6.34194 7.24548 9.03602 5.11156 12.2369 5.11156Z" fill="#E54335" />
        </svg>
      </div>
      
      <div className={style.btn__item} onClick={signInWithFacebook}>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.02 24.38C4.32 23.36 0 18.44 0 12.5C0 5.9 5.4 0.5 12 0.5C18.6 0.5 24 5.9 24 12.5C24 18.44 19.68 23.36 13.98 24.38L13.32 23.84H10.68L10.02 24.38Z" fill="url(#paint0_linear_32_5050)" />
          <path d="M16.6798 15.86L17.2198 12.5H14.0398V10.16C14.0398 9.19999 14.3998 8.47999 15.8398 8.47999H17.3998V5.41999C16.5598 5.29999 15.5998 5.17999 14.7598 5.17999C11.9998 5.17999 10.0798 6.85999 10.0798 9.85999V12.5H7.07983V15.86H10.0798V24.32C10.7398 24.44 11.3998 24.5 12.0598 24.5C12.7198 24.5 13.3798 24.44 14.0398 24.32V15.86H16.6798Z" fill="white" />
          <defs>
            <linearGradient id="paint0_linear_32_5050" x1="12.0006" y1="23.6654" x2="12.0006" y2="0.495579" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0062E0" />
              <stop offset="1" stopColor="#19AFFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    
      <div className={style.btn__item} onClick={signInWithTwitter}>
        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_32_5055)">
            <path d="M7.54854 20.2508C16.6059 20.2508 21.5598 12.7469 21.5598 6.23952C21.5598 6.02689 21.5598 5.81426 21.5455 5.60322C22.5087 4.90662 23.3417 4.04342 24.0018 3.05485C23.1037 3.45314 22.1501 3.71495 21.1742 3.8292C22.2024 3.21353 22.972 2.2456 23.3386 1.10629C22.3722 1.67912 21.3138 2.08375 20.211 2.30114C19.2796 1.31099 17.98 0.749268 16.6201 0.749268C13.9163 0.749268 11.6916 2.97393 11.6916 5.6778C11.6916 6.05228 11.7345 6.42676 11.8186 6.79171C7.86114 6.59337 4.16871 4.72097 1.66953 1.64738C0.369963 3.88474 1.04276 6.78378 3.19443 8.2214C2.41056 8.1976 1.64414 7.98656 0.960244 7.60573V7.66761C0.960244 10.0033 2.6216 12.0328 4.91132 12.4946C4.18616 12.6929 3.4261 12.7215 2.68824 12.5787C3.33248 14.5796 5.18742 15.9585 7.28831 15.9982C5.54444 17.3676 3.3896 18.1118 1.17287 18.1102C0.780938 18.1102 0.389004 18.0864 0.000244141 18.0388C2.25188 19.4843 4.87324 20.2508 7.54854 20.2476" fill="#1DA1F2" />
          </g>
          <defs>
            <clipPath id="clip0_32_5055">
              <rect width="24" height="19.5015" fill="white" transform="translate(0 0.749268)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default SocialLogin;
