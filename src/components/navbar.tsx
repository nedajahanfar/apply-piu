import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import '../styles/navbar.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/applypiuLogo.png';

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      const arrow = document.getElementById('nav-arrow');
      if (arrow) {
        arrow.style.display = 'none';
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    document.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ direction: 'ltr' }}>
          <img
            src={logo}
            height="40"
            className="d-inline-block align-top"
            alt="Apply PIU Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="bg-white">
          <Nav className="ms-auto">
            <Nav.Link className="mx-3 nav-link-hover" onClick={() => handleScroll("home")}>{t("navbar.home")}</Nav.Link>
            <Nav.Link className="mx-3 nav-link-hover" onClick={() => handleScroll("aboutUs")}>{t("navbar.aboutUs")}</Nav.Link>
            <Nav.Link className="mx-3 nav-link-hover" onClick={() => handleScroll("services")}>{t("navbar.services")}</Nav.Link>
            <Nav.Link className="mx-3 nav-link-hover" onClick={() => handleScroll("appointments")}>{t("navbar.bookAppointment")}</Nav.Link>
            <div className="nav-mentorship-wrapper position-relative">
              <Nav.Link
                as={Link}
                className="mx-3 nav-highlight-btn fw-bold"
                id="nav-mentorship-btn"
                to="/services/mentorship">
                {t("navbar.bookMentorship")}
              </Nav.Link>
              <div id="nav-arrow" className="nav-arrow"><FaArrowUp /></div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
