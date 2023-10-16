import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from '../config/Firebase';
import { getDocs, addDoc, collection, Timestamp, orderBy, query } from "firebase/firestore";
import Navbar from '../components/Navbar';
import style from './EbookPreview.module.css';

const EbookPreview = (props) => {
  // Get collection from database
  const usersCollectionRef = collection(db, "users");

  // Get user info from local storage
  const userInfoLocalStorage = localStorage.getItem('userAuth');
  const userInfo = JSON.parse(userInfoLocalStorage);

  // Get pdf info from local storage
  const pdfInfoLocalStorage = localStorage.getItem('pdfData');
  const pdfInfo = JSON.parse(pdfInfoLocalStorage);

  // Register navigate
  const navigate = useNavigate();

  // Function to save PDF data into database
  const savePdf = async () => {
    try {
      // Get the users from db
      const data = await getDocs(usersCollectionRef);
      // Add generated response to loggged in user PDFs collection
      data.docs.map(async (elem) => {
        if (elem.data().id === userInfo.id) {
          await addDoc(collection(db, `users/${elem.id}/pdfGenerated`), {
            dalle: pdfInfo.imageSource,
            chatGPT: pdfInfo.text,
            date: Timestamp.now()
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    navigate('/thank-you');
  };

  return (
    <>
      {localStorage.getItem('userAuth') === null || userInfo.email === "" ?
        <Navigate to='/login' />
        :
        <>
          <div className={style.preview__section}>
            <Navbar />
            <div className={`${"container"} ${style['preview__section-container']}`}>
              <div className={`${"row justify-content-center"}`}>
                <div className={`${"col-md-8 col-12"}`}>
                  <div className={style.preview__container}>
                    <div className={style.preview__content}>
                      <div className={`${"text-center"} ${style.preview__btn}`}>
                        <button className={style['preview__btn-link']} onClick={savePdf}>Save eBook</button>
                      </div>

                      <div className={style.preview__pdf}>
                        <img src={pdfInfo.imageSource} />
                        <div className={style.preview__text}>
                          <p>
                            {pdfInfo.text.split('\n').map((paragraph, i) => (
                              <p key={i}>{paragraph}</p>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "50px" }}><a className={style['previe__btn-back']} href="/ebook-form">Back to form</a></div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default EbookPreview;

