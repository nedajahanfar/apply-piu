import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import  fetchEuro  from "./fetchEuroPrice";

const MotivationLetterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    intro: "",
    program: "",
    education: "",
    work: "",
    extracurricular: "",
    teaching: "",
    goals: "",
    passion: "",
    whyCountry: "",
    yourImpact: "",
    receipt: null as File | null,
  });

  const [euroPrice, setEuroPrice] = useState<number | null>(null);
  const [normalPrice, setNormalPrice] = useState<number | null>(null);
  const [urgentPrice, setUrgentPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const euro = await fetchEuro();
      if (euro) {
        setEuroPrice(euro);
        setNormalPrice(euro * 69);
        setUrgentPrice(euro * 79);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 12 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, receipt: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, (formData as any)[key]);
    }

    await fetch("https://formspree.io/f/YOUR_ID", {
      method: "POST",
      body: dataToSend,
    });

    alert("فرم ارسال شد.");
  };

  return (
    <div className="container mt-4 mb-5 p-4 bg-light rounded" dir="rtl" style={{ maxWidth: "800px" }}>
      <h3 className="text-center mb-4">فرم نگارش انگیزه‌نامه</h3>

      <Card className="mb-3 p-3 bg-warning-subtle">
        <strong>📌 راهنما:</strong>
        <ul className="mb-0">
          <li>
            بر اساس نرخ لحظه‌ای یورو، هزینه خدمات به شرح زیر است:
            <ul>
              <li>سرویس عادی (۶ روز کاری): {normalPrice ? `${normalPrice.toLocaleString()} تومان` : "در حال دریافت..."}</li>
              <li>سرویس فوری (۳ روز کاری): {urgentPrice ? `${urgentPrice.toLocaleString()} تومان` : "در حال دریافت..."}</li>
            </ul>
          </li>
          <li>
            برای پرداخت، از لینک زیر استفاده کنید:
            <br />
            <a href="https://your-zarinpardakht-link.com" target="_blank" rel="noopener noreferrer">
              پرداخت از طریق زرین‌پرداخت
            </a>
          </li>
          <li>
            پس از پرداخت، رسید را دانلود و در قسمت پایین فرم بارگذاری نمایید.
          </li>
        </ul>
      </Card>

      <Form onSubmit={handleSubmit}>
        {[
          { name: "intro", label: "معرفی کامل خودتون" },
          { name: "program", label: "چه رشته‌ای و چه مقطعی می‌خواهید اپلای کنید و چرا این برنامه مناسب شماست؟" },
          { name: "education", label: "سوابق تحصیلی و افتخارات" },
          { name: "work", label: "سوابق کاری مرتبط با رشته" },
          { name: "extracurricular", label: "کارهای فوق‌برنامه مفید برای ذکر" },
          { name: "teaching", label: "سابقه تدریس یا TA" },
          { name: "goals", label: "اهداف تحصیلی یا شغلی آینده و ارتباط برنامه با آن‌ها" },
          { name: "passion", label: "علاقه به رشته و دلایل شایستگی برای برنامه" },
          { name: "whyCountry", label: "چرا این کشور و تحصیل در خارج؟" },
          { name: "yourImpact", label: "چگونه به دانشگاه/برنامه کمک خواهید کرد؟" },
        ].map(({ name, label }) => (
          <Form.Group className="mb-3" key={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="textarea" name={name} rows={3} value={(formData as any)[name]} onChange={handleChange} required />
          </Form.Group>
        ))}

        <Form.Group className="mb-4">
          <Form.Label>رسید پرداخت</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} required />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="primary">ارسال فرم</Button>
        </div>
      </Form>
    </div>
  );
};

export default MotivationLetterForm;
