import React, { useState, useEffect, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Navigate, useNavigate } from "react-router-dom";
import CountUp from 'react-countup';
import Navbar from '../components/Navbar';
import logoSymbol from '../assets/images/logo-symbol.png';
import style from './EbookForm.module.css';

// OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const EbookForm = (props) => {
  // Get user info from local storage
  const userInfoLocalStorage = localStorage.getItem('userAuth');
  const userInfo = JSON.parse(userInfoLocalStorage);

  // Register PDF data (text and img source) in local storage
  useEffect(() => {
    localStorage.removeItem('pdfData');
  }, []);

  // Register navigate
  const navigate = useNavigate();

  // Register boolena for counter
  const [startGeneratePdf, setStartGeneratePdf] = useState(false);

  // Register ref for every select
  const subjectInputRef = useRef();
  const domainInputRef = useRef();
  const designInputRef = useRef();
  const targetInputRef = useRef();

  async function generateEbook(event) {
    event.preventDefault();
    const enteredSubject = subjectInputRef.current.value;
    const enteredDomain = domainInputRef.current.value;
    const enteredDesign = designInputRef.current.value;
    const enteredTarget = targetInputRef.current.value;

    if (
      enteredSubject.trim().length === 0 ||
      enteredDomain.trim().length === 0 ||
      enteredDesign.trim().length === 0 ||
      enteredTarget.trim().length === 0
    ) {
      return
    }

    try {
      setStartGeneratePdf(!startGeneratePdf);

      // Generate DALLE-E images
      const coverImage = await openai.createImage({
        prompt: enteredDesign + " about " + enteredSubject,
        n: 1,
        size: "256x256",
      })
      console.log(coverImage.data.data[0].url);

      // Generate ChatGPT text
      const content = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Write a Title and 10 chapter title about " + enteredSubject + " for " + enteredDomain + " domain.  I want the text to target " + enteredTarget,
        max_tokens: 100,
        temperature: 0.5,
      });
      console.log(content.data.choices[0].text);

      // Register user response
      const pdf = {
        imageSource: coverImage.data.data[0].url,
        text: content.data.choices[0].text
      };
      const pdfGenerated = JSON.stringify(pdf);
      localStorage.setItem('pdfData', pdfGenerated);
      console.log(pdf);

    }
    catch (error) {
      console.log(error);
    }

    // Redirect to Ebook Preview after 5s
    setTimeout(() => {
      navigate('/ebook-preview');
    }, 5000);
  }

  return (
    localStorage.getItem('userAuth') === null || userInfo.email === "" ?
      <Navigate to='/login' /> :
      <>
        <div className={style.form__section}>
          <Navbar />
          <div className={`${"container"} ${style['form__section-container']}`}>
            <div className={`${"row justify-content-center"}`}>
              {!startGeneratePdf &&
                <div className={`${"col-md-8 col-12"} ${style.form__container}`}>
                  <div className={style.form__header}>
                    <div className={style.header__image}>
                      <img src={logoSymbol} alt="SwiftBook" />
                    </div>
                    <div className={style.header__content}>
                      <p className={style['header__content-text']}>Hello {userInfo.name} and welcome to</p>
                      <h4 className={style['header__content-text']}>IdeaBook</h4>
                    </div>
                  </div>

                  <form className={style.form__content} onSubmit={generateEbook}>
                    <div className={style.form__input}>
                      <label className={style['form__input-label']}>What is your eBook about (subject)</label>
                      <input type="text" className={style['form__input-field']} placeholder="Write main ideas" ref={subjectInputRef} required />
                    </div>

                    <div className={style.form__input}>
                      <label className={style['form__input-label']}>What is the domain of your eBook?</label>
                      <select className={style['form__input-field']} ref={domainInputRef} required>
                        <option value="">Select domain</option>
                        <option value="Arts and entertainment">Arts and entertainment</option>
                        <option value="Business and finance">Business and finance</option>
                        <option value="History and culture">History and culture</option>
                        <option value="Science and technology">Science and technology</option>
                      </select>
                    </div>

                    <div className={style.form__input}>
                      <label className={style['form__input-label']}>What style of design should your cover image have?</label>
                      <select className={style['form__input-field']} ref={designInputRef} required>
                        <option value="">Select design</option>
                        <option value="Abstract Design">Abstract Design</option>
                        <option value="Ilustrative Design">Ilustrative Design</option>
                        <option value="Modern Design">Modern Design</option>
                        <option value="Vintage Design">Vintage Design</option>
                      </select>
                    </div>

                    <div className={style.form__input}>
                      <label className={style['form__input-label']}>What target should your eBook have?</label>
                      <select className={style['form__input-field']} ref={targetInputRef} required>
                        <option value="">Select target</option>
                        <option value="children">Children</option>
                        <option value="adults">Adults</option>
                        <option value="students">Students</option>
                        <option value="entrepreneurs">Entrepreneurs</option>
                      </select>
                    </div>

                    <button type="submit" className={style.form__btn}>Generate your eBook</button>
                  </form>
                </div>
              }

              {startGeneratePdf &&
                <div className={style.counter__div}>
                  <div className={style.counter}>
                    <div className={style.counter__spin}>
                      <CountUp
                        start={0}
                        end={100}
                        duration={5}
                        suffix="%"
                      />
                      <br />
                      <svg>
                        <circle cx="50%" cy="50%" r="97" />
                      </svg>
                    </div>
                    <div className={style.counter__content}>
                      <div className={style['content-text']}>
                        <p>Generating your</p>
                      </div>
                      <div className={style['content-title']}>
                        <h3>eBook</h3>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </>
  );
};

export default EbookForm;