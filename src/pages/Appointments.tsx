import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/appointments.css';
import  fetchEuro  from '../forms/fetchEuroPrice'; 

const BookConsultation = () => {
  const [consultationType, setConsultationType] = useState<'normal' | 'technical'>('normal');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failure' | 'Not the right amount'>('pending');
  const [euroPrice, setEuroPrice] = useState<number | null>(null);

  const { t } = useTranslation();
  const location = useLocation();

  const euroBasePrice = consultationType === 'normal' ? 10 : 30;
  const localCurrencyPrice = euroPrice ? (euroPrice * euroBasePrice) : null;

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchEuro();
      console.log('💸 Final Euro price:', price);
      setEuroPrice(price);
    };
  
    fetchPrice();
  }, []);

  const handleConsultationChange = (type: 'normal' | 'technical') => {
    setConsultationType(type);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatusFromUrl = params.get('status');
    const amountPaid = params.get('amount');

    if (paymentStatusFromUrl) {
      if (paymentStatusFromUrl === 'success') {
        if (amountPaid && localCurrencyPrice && Number(amountPaid) === localCurrencyPrice) {
          setPaymentStatus('success');
        } else {
          setPaymentStatus('Not the right amount');
        }
      } else {
        setPaymentStatus('failure');
      }
    }
  }, [location.search, localCurrencyPrice]);

  const paymentLink = `https://zarinp.al/applypiu`;

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md text-center" id="appointments">
      <h2 className="text-2xl font-bold mb-6">{t("bookConsultation.title")}</h2>
      <p className="text-lg mb-6">{t("bookConsultation.description")}</p>

      {paymentStatus === 'pending' && (
        <div className="mb-8">
          <p className="text-lg mb-4">{t("bookConsultation.selectConsultationType")}</p>
          <div className="flex justify-center gap-8 mb-6">
            <button
              onClick={() => handleConsultationChange('normal')}
              type='button'
              className={`px-8 py-3 rounded-full font-semibold text-lg ${
                consultationType === 'normal' ? 'bg-blue-700' : 'bg-white text-blue-700 border'
              }`}
            >
              {t("bookConsultation.normalConsultation")}
            </button>

            <button
              onClick={() => handleConsultationChange('technical')}
              type='button'
              className={`px-8 py-3 rounded-full font-semibold text-lg ${
                consultationType === 'technical' ? 'bg-blue-700' : 'bg-white text-blue-700 border'
              }`}
            >
              {t("bookConsultation.professionalConsultation")}
            </button>
          </div>

          {localCurrencyPrice !== null ? (
            <div className="bg-blue-800 p-4 rounded-lg inline-block mb-4">
              <p className="text-lg font-semibold">
                {t("bookConsultation.selectedConsultation", {
                  type: consultationType === 'normal' ? 'Normal' : 'Professional',
                })}
              </p>
              <p className="text-xl font-bold">
                {localCurrencyPrice} Toman
              </p>
            </div>
          ) : (
            <p>{t("bookConsultation.loadingEuroPrice")}</p>
          )}

          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 font-bold rounded-lg shadow-md transition duration-200"
          >
            {t("bookConsultation.proceedToPayment")}
          </a>
        </div>
      )}

      {paymentStatus === 'success' && (
        <div id="calendar-section" className="mb-8">
          <iframe
            src="https://koalendar.com/e/apply-piu-consultancy"
            style={{
              width: '100%',
              height: '700px',
              border: 'none',
              borderRadius: '10px',
            }}
            title="Appointment Scheduler"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {paymentStatus === 'failure' && (
        <div className="mb-8 text-red-600">
          <h2>{t("bookConsultation.paymentFailure")}</h2>
        </div>
      )}

      {paymentStatus === 'Not the right amount' && (
        <div className="mb-8 text-red-600">
          <h2>{t("bookConsultation.incorrectAmount")}</h2>
        </div>
      )}
    </div>
  );
};

export default BookConsultation;
