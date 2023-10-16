import React from 'react';
import style from './ThankYou.module.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ThankYou = () => {
  return (
    <>
      <div className={style.topHero}>
        <Navbar />

        <div className={`${"container"} ${style.heroContent}`}>
          <div className={`${"row justify-content-center text-center"}`}>
            <div className={`${"col-12"}`}>
              <h1 className={style.heroContent__title}><span>Congratulation!</span></h1>
              <p className={style.heroContent__text}>You generate a new PDF with AI PDF GENERATOR</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ThankYou;