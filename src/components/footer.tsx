import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; 

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-5" style={{ background: 'linear-gradient(to right, #0056b3, #003366)', color: '#fff' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h4>{t('footer.companyName')}</h4>
            <p className="mb-2">{t('footer.description')}</p>
            <p>{t('footer.email')}</p>
            <p><span style={{direction : "ltr", unicodeBidi: "plaintext"}}>{t('footer.phone')}</span></p>
            <p>{t('footer.location')}</p>
          </Col>
          <Col md={6} className="text-md-end mt-4 mt-md-0">
            <p>{t('footer.copyright')}</p>
            <p>{t('footer.websiteMadeBy')}</p>
            <div>
              <a href="https://www.linkedin.com/in/eshaghjahangiri/" style={{ color: '#fff', margin: '0 10px' }} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
              <a href="https://www.instagram.com/applypiu/" style={{ color: '#fff', margin: '0 10px' }} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.facebook.com/eshaghjahangirii/" style={{ color: '#fff', margin: '0 10px' }} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
