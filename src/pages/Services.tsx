import { Container, Row, Col } from 'react-bootstrap';
import { FaPenFancy, FaLightbulb, FaChalkboardTeacher, FaComments } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const servicesRef = useRef(null);

  const services = [
    {
      icon: <FaPenFancy />,
      title: t("services.resume.title"),
      description: t("services.resume.description"),
    },
    {
      icon: <FaLightbulb />,
      title: t("services.motivation.title"),
      description: t("services.motivation.description"),
    },
    {
      icon: <FaChalkboardTeacher />,
      title: t("services.mentorship.title"),
      description: t("services.mentorship.description"),
      isGolden: true,
    },
    {
      icon: <FaComments />,
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const boxes = document.querySelectorAll('.service-box');
          const animationOrder = [0, 1, 3, 2]; // top-left, top-right, bottom-right, bottom-left

          animationOrder.forEach((boxIndex, i) => {
            setTimeout(() => {
              boxes[boxIndex].classList.add('fade-in');
            }, i * 1000);
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Container className="py-5 mt-5" ref={servicesRef} id="services">
      <style>
        {`
          .service-box {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 1s ease, transform 1s ease, box-shadow 0.3s ease;
            height: 100%; /* Ensure all boxes have same height */
          }

          .service-box.fade-in {
            opacity: 1;
            transform: translateY(0);
          }

          .service-box:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }

          .service-link {
            text-decoration: none;
            color: inherit;
            display: block;
          }

          .icon-circle.golden {
            background-color: #FFD700;
            box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700;
            animation: shine 2s infinite;
          }

          @keyframes shine {
            0% { box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700; }
            50% { box-shadow: 0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FFD700; }
            100% { box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700; }
          }
        `}
      </style>

      <Row className="g-4 text-center">
        <h2>{t("services.title")}</h2>
        {services.map((service, index) => {
          let link = "#";
          let isInternal = false;
          switch (service.title) {
            case t("services.resume.title"):
              link = "/services/resume";
              isInternal = true;
              break;
            case t("services.motivation.title"):
              link = "/services/motivation-letter";
              isInternal = true;
              break;
            case t("services.mentorship.title"):
              link = "/services/mentorship";
              isInternal = true;
              break;
            case t("services.consulting.title"):
              link = "#appointments";
              isInternal = false;
              break;
          }

          return (
            <Col key={index} xs={12} sm={12} md={6} className="d-flex">
              <div className="service-link w-100">
                <div className="service-box p-4 bg-white shadow-sm rounded w-100 text-center h-100 d-flex flex-column justify-content-between">
                  <div
                    className={`icon-circle mb-4 mx-auto d-flex align-items-center justify-content-center ${service.isGolden ? "golden" : ""}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: service.isGolden ? "#FFD700" : "var(--primary-color)",
                      color: "white",
                      fontSize: "2rem",
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="h4 mb-3">{service.title}</h3>
                  <p className="text-muted mb-3">{service.description}</p>
                  {isInternal ? (
                    <Link to={link} className="btn btn-outline-primary mt-2">
                      {t("services.getStarted")}
                    </Link>
                  ) : (
                    <a href={link} className="btn btn-outline-primary mt-2">
                      {t("services.getStarted")}
                    </a>
                  )}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Services;
