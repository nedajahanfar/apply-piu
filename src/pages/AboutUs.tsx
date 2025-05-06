import { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import founderImg from '../assets/eshaghJahangiri.jpg'; 
import '../styles/AboutUs.css';
import { useTranslation } from 'react-i18next';

function AboutUs() {
  
  const { t } = useTranslation();
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.floating-box').forEach((box, index) => {
            const boxElement = box as HTMLElement;
            boxElement.style.animation = "none";
            boxElement.offsetHeight; 
            boxElement.style.animation = `floatIn 1s ease-out ${index * 0.5}s forwards`;
          });
        } else {
          entry.target.querySelectorAll('.floating-box').forEach((box) => {
            const boxElement = box as HTMLElement;
            boxElement.style.animation = "none";
          });
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <Container className="py-5 mt-5" id='aboutUs'>
      <Row className="align-items-center">
        <Col sm={12} md={8} className="mb-4 mb-md-0">
          <div className="about-text-wrapper" style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)', padding: '2rem', borderRadius: '12px' }}>
            <div className="text-center">
             <h2 className="about-heading">{t("about.meetFounder")}</h2>
             </div>
              <p className="about-text text-center">{t("about.paragraph1")}</p>
              <p className="about-text text-center">{t("about.paragraph2")}</p>
              <p className="about-text text-center">{t("about.paragraph3")}</p>
          </div>
        </Col>

        <Col sm={12} md={4} className="ps-md-4">
          <div ref={imageRef} className="position-relative d-inline-block mt-4">
            <img src={founderImg} alt="Main visual" className="img-fluid rounded" style={{ minWidth: '300px', width: '100%', maxWidth: '600px' }} />

            <div className="position-absolute d-flex justify-content-between align-items-center px-3 py-2 bg-white border rounded-pill shadow floating-box box1" style={{ top: '8%', left: '-12%', opacity: 0 }}>
              <span className="circle-indicator bg-primary me-2"></span>
              <span className="fw-medium">Canada</span>
            </div>

            <div className="position-absolute d-flex align-items-center px-3 py-2 bg-white border rounded-pill shadow floating-box box2" style={{ top: '30%', right: '-10%', opacity: 0 }}>
              <span className="circle-indicator bg-success me-2"></span>
              <span className="fw-medium">Germany</span>
            </div>

            <div className="position-absolute d-flex align-items-center px-3 py-2 bg-white border rounded-pill shadow floating-box box3" style={{ bottom: '15%', left: '4%', opacity: 0 }}>
              <span className="circle-indicator bg-warning me-2"></span>
              <span className="fw-medium">Italy</span>
            </div>

            <div className="position-absolute d-flex align-items-center px-3 py-2 bg-white border rounded-pill shadow floating-box box4" style={{ bottom: '25%', right: '-8%', opacity: 0 }}>
              <span className="circle-indicator bg-danger me-2"></span>
              <span className="fw-medium">United Kingdom</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
