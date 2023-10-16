import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { auth, db } from '../config/Firebase';
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import Footer from '../components/Footer';
import style from './Dashboard.module.css';

const PdfGenerated = () => {
  const usersCollectionRef = collection(db, "users");
  const [PdfList, setPdfList] = useState([]);
  const [isFullText, setIsFullText] = useState(false);

  // Get user info from local storage
  const userInfoLocalStorage = localStorage.getItem('userAuth');
  const userInfo = JSON.parse(userInfoLocalStorage);

  // Function to change date format
  const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    const getPdfs = async () => {
      try {
        // Get the users from db
        const data = await getDocs(usersCollectionRef);

        // Get PDFs data from the logged in user
        data.docs.map(async (elem) => {
          if (elem.data().id === auth.currentUser.uid) {
            const pdf = query(collection(db, `users/${elem.id}/pdfGenerated`), orderBy("date", "desc"));
            const pdfInfo = await getDocs(pdf);
            const pdfData = pdfInfo.docs.map((pdfDetail) => ({
              ...pdfDetail.data(),
              id: pdfDetail.id
            }))
            setPdfList(pdfData);
          }
        });

      } catch (error) {
        console.error(error);
      }
    };
    getPdfs();
  }, []);

  const toggleContent = () => {
    setIsFullText(!isFullText);
  };

  return (
    localStorage.getItem('userAuth') === null || userInfo.email === "" ?
      <Navigate to='/login' /> :
      <>
        <Navbar />
        <div className={`${"container mt-5 mb-5"}`}>
          <div className={`${"row"}`}>
            <div className={`${"col-12 text-center mb-4"}`}>
              <h1 className={style.dashboard__title}><span>Dashboard</span></h1>
              <p className={style.dashboard__text}>All your PDFs generated history</p>
            </div>
            <div className={`${"col-12 mb-5"}`}>
              <a className={`${style['dashboard__item-btn']}`} onClick={toggleContent}>{isFullText ? 'Trim content' : 'Full content'}</a>
            </div>
            {PdfList.map((pdf) => (
              <div className={`${"col-md-4 col-12"} ${style.dashboard__item}`} key={pdf.id}>
                <div>
                  <img src={pdf.dalle} className={`${style['dashboard__item-img']}`} />
                  <div className={`${style['dashboard__item-content']}`}>
                    <div className={`${style['dashboard__item-date']}`}>{pdf.date.toDate().toLocaleDateString('us-US', dateFormat)}</div>
                    <div className={`${`${style['dashboard__item-text']}`} ${isFullText ? '' : style.trucated}`}>
                      {pdf.chatGPT.split('\\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    {!isFullText && <p>...</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </>
  )
}

export default PdfGenerated;