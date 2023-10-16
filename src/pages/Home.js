import React from 'react';
import style from './Home.module.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ebook from '../assets/images/eBook.jpg';

const Home = () => {
  return (
    <>
      <div className={style.topHero}>
        <Navbar />
        
        <div id="about" className={`${"container"} ${style.heroContent}`}>
          <div className={`${"row justify-content-center text-center"}`}>
            <div className={`${"col-md-8 col-12"}`}>
              <h1 className={style.heroContent__title}><span>Your generator for</span> <br /><span>eBook ideas</span></h1>
              <p className={style.heroContent__text}>Our AI-powered generator assistant helps get your thoughts on paper, and much more.</p>
              <a className={style.heroContent__btn} href="/ebook-form">Create your eBook</a>

              <div className={style.heroContent__list}>
                <div className={style['heroContent__list-item']}>
                  <div className={`${"text-center"} ${style.item__check}`}>
                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.0501 13L0.350098 7.29998L1.7751 5.87498L6.0501 10.15L15.2251 0.974976L16.6501 2.39998L6.0501 13Z" fill="#048848" />
                    </svg>
                  </div>
                  <span className={style.item__title}>Free acces</span>
                </div>
                <div className={style['heroContent__list-item']}>
                  <div className={`${"text-center"} ${style.item__check}`}>
                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.0501 13L0.350098 7.29998L1.7751 5.87498L6.0501 10.15L15.2251 0.974976L16.6501 2.39998L6.0501 13Z" fill="#048848" />
                    </svg>
                  </div>
                  <span className={style.item__title}>Instant access</span>
                </div>
                <div className={style['heroContent__list-item']}>
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

        <div id="steps" className={`${"container"} ${style.heroSteps}`}>
          <div className={style.heroSteps__title}>
            <h2>Generate<br />steps</h2>
          </div>
          <div className={style.heroSteps__list}>
            <div className={style['heroSteps__list-item']}>
              <div className={style.item__title}>
                <span className={style['item__title-number']}>01</span>
                <span className={style['item__title-text']}>Set eBook's topic</span>
              </div>
              <div className={style.item__description}>
                <p>Select from the list your domain and target for the PDS. You have the design for cover image too.</p>
              </div>
            </div>
            <div className={style['heroSteps__list-item']}>
              <div className={style.item__title}>
                <span className={style['item__title-number']}>02</span>
                <span className={style['item__title-text']}>Generate eBook</span>
              </div>
              <div className={style.item__description}>
                <p>The AI generator will write for you a title and 10 chapter for yout eBook.</p>
              </div>
            </div>
            <div className={style['heroSteps__list-item']}>
              <div className={style.item__title}>
                <span className={style['item__title-number']}>03</span>
                <span className={style['item__title-text']}>Save eBook for later</span>
              </div>
              <div className={style.item__description}>
                <p>You can save the eBook and you cand access later form your Dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="price" className={style.ebook}>
        <div className={style.ebook__shape}></div>

        <div className={`${"container"} ${style.ebook__container}`}>
          <div className={`${"row"}`}>
            <div className={`${"col-md-4 col-12 text-center"} ${style.ebook__preview}`}>
              <img src={ebook} />
            </div>

            <div className={`${"col-md-4 col-12"} ${style.ebook__content}`}>
              <h3 className={style['ebook__content-title']}>eBook ideas</h3>
              <p className={style['ebook__content-price']}>free access</p>
              <ul className={style['ebook__content-list']}>
                <li className={style.list__item}>AI generated content</li>
                <li className={style.list__item}>AI design cover</li>
                <li className={style.list__item}>Preview and save</li>
              </ul>
              <a className={style['ebook__content-btn']} href="/ebook-form">Start generate</a>
            </div>

            <div className={`${"col-md-4 col-12"} ${style.ebook__title}`}>
              <h2>Ready to get eBook ideas?</h2>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;