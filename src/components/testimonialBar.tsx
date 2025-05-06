import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import '../styles/testimonial.css';


const styles = {
  marginTop: '5rem',
  marginBottom: '5rem'
};

const testimonials = [
  {
    key: "farhad",
    photo: "https://ui-avatars.com/api/?name=Farhad+Karimi&background=0D8ABC&color=fff&rounded=true"
  },
  {
    key: "sheida",
    photo: "https://ui-avatars.com/api/?name=Sheida+Zibapasand&background=6A1B9A&color=fff&rounded=true"
  },
  {
    key: "aida",
    photo: "https://ui-avatars.com/api/?name=Aida+Jahandid&background=00796B&color=fff&rounded=true"
  },
  {
    key: "ali",
    photo: "https://ui-avatars.com/api/?name=Milad+Rahimi&background=283593&color=fff&rounded=true"
  },
  {
    key: "sara",
    photo: "https://ui-avatars.com/api/?name=Sara+Ahmadi&background=C2185B&color=fff&rounded=true"
  },
  {
    key: "reza",
    photo: "https://ui-avatars.com/api/?name=Reza+Najafi&background=00695C&color=fff&rounded=true"
  }
];


const TestimonialBar = () => {
  const { t } = useTranslation();

  return (
    <div className="testimonial-bar" style={styles}>
      <Container>
      <h2 className="text-center mb-5">{t('testimonials.title')}</h2>

        <div className="scrollable-testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <div className="testimonial-avatar">
                <img
                  src={testimonial.photo}
                  alt={t(`testimonials.${testimonial.key}.name`)}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto',
                    display: 'block'
                  }}
                />
              </div>
              <p className="testimonial-quote">{t(`testimonials.${testimonial.key}.quote`)}</p>
              <p className="testimonial-name">{t(`testimonials.${testimonial.key}.name`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TestimonialBar;
