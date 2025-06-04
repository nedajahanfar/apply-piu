import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/appointments.css';
import { useEuroPrice } from '../hooks/useEuroPrice';

const BookConsultation = () => {
  const [consultationType, setConsultationType] = useState<'normal' | 'technical'>('normal');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failure' | 'Not the right amount'>('pending');

  const { t } = useTranslation();
  const location = useLocation();

  const { price: euroPrice, error } = useEuroPrice();
  const euroBasePrice = consultationType === 'normal' ? 10 : 30;
  const localCurrencyPrice = euroPrice ? euroPrice * euroBasePrice : null;

  const handleConsultationChange = (type: 'normal' | 'technical') => {
    setConsultationType(type);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatusFromUrl = params.get('status');
    const amountPaid = params.get('amount');

    if (paymentStatusFromUrl === 'success') {
      if (amountPaid && localCurrencyPrice) {
        const roundedPaid = Math.round(Number(amountPaid));
        const expectedRounded = Math.round(localCurrencyPrice);

        if (roundedPaid === expectedRounded) {
          setPaymentStatus('success');
        } else {
          setPaymentStatus('success'); // Still show calendar
          // Send warning email
          fetch("https://formspree.io/f/your-form-id", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: `Warning: A user paid ${roundedPaid} Toman but expected was ${expectedRounded} Toman. Please verify the booking manually.`,
            }),
          });
        }
      } else {
        setPaymentStatus('failure');
      }
    } else if (paymentStatusFromUrl === 'failure') {
      setPaymentStatus('failure');
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

          {error && <p className="text-red-600">{t("bookConsultation.errorFetchingPrice")}</p>}

          {localCurrencyPrice !== null ? (
            <div className="bg-blue-800 p-4 rounded-lg inline-block mb-4">
              <p className="text-lg font-semibold">
                {t("bookConsultation.selectedConsultation", {
                  type: consultationType === 'normal' ? 'Normal' : 'Professional',
                })}
              </p>
              <p className="text-xl font-bold">
                {localCurrencyPrice.toLocaleString()} Toman
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
    </div>
  );
};

export default BookConsultation;
