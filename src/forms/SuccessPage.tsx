import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const authority = query.get('Authority');

  return (
    <div
      dir="rtl"
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: '20px',
        fontFamily: 'Tahoma, sans-serif',
      }}
    >
      <h2>پرداخت موفق</h2>
      <p>لطفاً کد تراکنش (Authority) زیر را کپی و نگهداری کنید:</p>
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          marginBottom: '20px',
          fontWeight: 'bold',
          wordBreak: 'break-all',
        }}
      >
        {authority || 'کدی یافت نشد'}
      </div>

      <p>شما می‌توانید یکی از گزینه‌های زیر را انتخاب کنید تا به صفحه مربوط به سرویس خود بروید:</p>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
  <li>
    <Link to="/services/motivation-letter" style={{ color: '#007bff', textDecoration: 'none' }}>
      فرم درخواست انگیزه‌نامه
    </Link>
  </li>
  <li>
    <Link to="/services/resume" style={{ color: '#007bff', textDecoration: 'none' }}>
      فرم درخواست رزومه
    </Link>
  </li>
  <li>
    <a
      href="https://koalendar.com/e/applypiu2?month=2025-06&duration=30&date=2025-06-04"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#007bff', textDecoration: 'none' }}
    >
      صفحه مشاوره
    </a>
  </li>
</ul>

      <p style={{ marginTop: 30, fontSize: '0.9rem', color: '#555' }}>
        توجه: کد تراکنش به صاحب سایت کمک می‌کند پرداخت شما را بررسی کند. لطفاً این کد را به دقت نگهداری کنید.
      </p>
    </div>
  );
};

export default SuccessPage;
