import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import BookAppointment from './pages/Appointments';
import TestimonialBar from './components/testimonialBar';
import MentorshipForm from './forms/mentorship';
import Footer from './components/footer';
import ResumeRequestForm from './forms/resumeRequestForm';
import MotivationLetterForm from './forms/motivationLetterForm';
import SuccessPage from './forms/SuccessPage';
import './i18n';


function LandingPage(){

  return(
    <>
      <Home />
      <AboutUs />
      <Services />
      <TestimonialBar />
      <BookAppointment />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services/mentorship" element={<MentorshipForm />} />
        <Route path="/services/resume" element={<ResumeRequestForm />} />
        <Route path="/services/motivation-letter" element={<MotivationLetterForm />} />
        <Route path="/book-consultation" element={<BookAppointment />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<div>صفحه مورد نظر یافت نشد</div>} />
      </Routes>
    </Router>
  );
}

export default App;
