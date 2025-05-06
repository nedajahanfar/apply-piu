import { Container } from 'react-bootstrap';
import homeBg from '../assets/homeBg.jpg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import '../styles/home.css'

const Home = () => {
  const { t, i18n } = useTranslation(); 
  const [activeLang, setActiveLang] = useState<string>(i18n.language);

  const changeLanguage = (lng: 'en' | 'fa') => {
    i18n.changeLanguage(lng);
    document.dir = lng === "fa" ? "rtl" : "ltr";
    setActiveLang(lng);
  };

  return (
    <div>
  
      <div className="language-switcher">
        <button 
          onClick={() => changeLanguage("en")} 
          className={activeLang === "en" ? "active" : ""}
        >
          EN
        </button>
        <button 
          onClick={() => changeLanguage("fa")} 
          className={activeLang === "fa" ? "active" : ""}
        >
          فارسی
        </button>
      </div>

      <div 
        className="hero-section" 
        id='home' 
        style={{
          backgroundImage: `url(${homeBg})`,
          height: '100vh',
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)'
          }}
        >
          <Container className="d-flex align-items-center justify-content-center h-100">
            <div className="text-center text-white">
              <h1 className="display-3 fw-bold mb-4">{t("home.title")}</h1>
              <p className="lead" style={{ fontFamily: 'var(--secondary-font)' }}>
                {t("home.subtitle")}
              </p>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Home;
