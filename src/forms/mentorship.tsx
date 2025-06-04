import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import mentorshipImage from '../assets/mentorship.jpg';
import Footer from '../components/footer';

function MentorshipForm() {
  const [status, setStatus] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [motivationLetterFile, setMotivationLetterFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);

    if (cvFile) formData.append('cv', cvFile);
    if (motivationLetterFile) formData.append('motivationLetter', motivationLetterFile);

    try {
      const response = await fetch('https://formspree.io/f/xrbqgkrz', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      console.error(error);
      setStatus('ERROR');
    }
  };

  return (
    <>
      <div
        style={{
          height: '250px',
          backgroundImage: `url(${mentorshipImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
        }}
      />

      <section className="py-5" dir="rtl" style={{ backgroundColor: '#f9f9f9' }}>
        <Container style={{
          maxWidth: '750px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '40px 30px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}>
          <h2 className="text-center fw-bold mb-4">درخواست منتورشیپ</h2>

          <p className="mb-4 text-center" style={{ lineHeight: '1.9' }}>
            منتورشیپ اپلای برای مقطع دکترا
            <br />
            برای اطلاعات بیشتر، هایلایت "منتورشیپ" را در پیج اینستاگرام applypiu ببینید.
            <br />
            بعد از بررسی رزومه ، تصمیم برای قبول کردن شما برای دوره ی منتورشیپ گرفته میشه 
            (به خاطره ظرفیت محدود) و از طریق ایمیل بهتون اطلاع داده میشه.
            <br /><br />
            <strong>هزینه منتورشیپ:</strong>
            <br />
            هزینه ماهانه: ۱۲۰ یورو<br />
            پرداخت اولیه (۲ ماه): ۲۴۰ یورو<br />
            تمدید ماهانه از ماه سوم، با پرداخت ۱۲۰ یورو، حداکثر ۱۰ روز قبل از پایان ماه.
          </p>

          <form>
           <p className="mb-4 text-center" style={{ lineHeight: '1.9' }}>
          به دلیل محدودیت‌های فنی، لطفاً برای درخواست منتورشیپ، فایل‌های زیر را از طریق ایمیل ارسال کنید:
          <br/>
          <strong>✔️ رزومه (CV) + انگیزه‌نامه</strong>
          <br /><br />
          بعد از بررسی مدارک، در صورت پذیرش برای منتورشیپ با شما تماس گرفته خواهد شد.
           </p>

           <div className="text-center">
          <a
           href="mailto:applypu@gmail.com?subject=درخواست منتورشیپ"
           className="btn btn-primary" >
           ارسال ایمیل به applypu@gmail.com
          </a>
        </div>
          </form>

         </Container>
        </section>

       <Footer />
    </>
  );
}

export default MentorshipForm;
