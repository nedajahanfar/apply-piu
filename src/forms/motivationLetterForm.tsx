import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useEuroPrice } from "../hooks/useEuroPrice";

const MotivationLetterForm: React.FC = () => {

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    transactionalId: string;
    intro: string;
    program: string;
    education: string;
    work: string;
    extracurricular: string;
    teaching: string;
    goals: string;
    passion: string;
    whyCountry: string;
    yourImpact: string;
    orderType: string;
  }
  

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    transactionalId: "",
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
    orderType: "normal",
  });
  

  const { price: euroPrice, error } = useEuroPrice();

  const normalPrice = euroPrice ? euroPrice * 69 : null;
  const urgentPrice = euroPrice ? euroPrice * 79 : null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, (formData as any)[key]);
    }

    try {
      const response = await fetch("https://formspree.io/f/xrbqgkrz", {
        method: "POST",
        body: dataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        alert(`خطا در ارسال فرم: ${text}`);
      } else {
        alert("فرم ارسال شد.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          transactionalId: "",
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
          orderType: "normal",
        });
      }
    } catch (err) {
      alert(`خطا در ارسال فرم: ${err}`);
    }
  };

  return (
    <div
      className="container mt-4 mb-5 p-4 bg-light rounded"
      dir="rtl"
      style={{ maxWidth: "800px", paddingTop: "100px", marginTop: "60px" }}
    >
      <h3 className="text-center mb-4">فرم نگارش انگیزه‌نامه</h3>

      <Card className="mb-3 p-3 bg-warning-subtle">
        <strong>📌 راهنما:</strong>
        <ul className="mb-0">
          <li>
            مراحل پرداخت و ارسال فرم به شرح زیر است:
            <ul>
              <li>
                ۱. برای پرداخت هزینه، روی لینک زیر کلیک کنید و مبلغ را
                پرداخت کنید:
                <br />
                <a
                  href="https://zarinp.al/applypiu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  پرداخت از طریق زرین‌پرداخت
                </a>
              </li>
              <li>
                ۲. پس از پرداخت، کد تراکنش (transactional ID) خود را کپی
                کنید.
              </li>
              <li>
                ۳. فرم را تکمیل کرده و کد تراکنش را در قسمت مربوطه وارد
                نمایید.
              </li>
              <li>
                ۴. سپس فرم را ارسال کنید.
              </li>
              <li>
                ۵. مالک سایت پس از بررسی پرداخت و کد تراکنش با شما
                تماس خواهد گرفت.
              </li>
            </ul>
          </li>
          <li>
            بر اساس نرخ لحظه‌ای یورو، هزینه خدمات به شرح زیر است:
            <ul>
              <li>
                سرویس عادی (۶ روز کاری):{" "}
                {euroPrice
                  ? `${normalPrice?.toLocaleString()} تومان`
                  : error
                  ? `خطا: ${error}`
                  : "در حال دریافت..."}
              </li>
              <li>
                سرویس فوری (۳ روز کاری):{" "}
                {euroPrice
                  ? `${urgentPrice?.toLocaleString()} تومان`
                  : error
                  ? `خطا: ${error}`
                  : "در حال دریافت..."}
              </li>
            </ul>
          </li>
        </ul>
      </Card>

      <Form onSubmit={handleSubmit}>
        {/* Required fields: First name, Last name, Email, Transactional ID */}
        <Form.Group className="mb-3">
          <Form.Label>نام</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>نام خانوادگی</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>کد تراکنش (transactional ID)</Form.Label>
          <Form.Control
            type="text"
            name="transactionalId"
            value={formData.transactionalId}
            onChange={handleChange}
            required
          />
        </Form.Group>

         <Form.Group className="mb-3">
                <Form.Label>نوع سفارش</Form.Label>
                 <div>
                 <Form.Check
                  inline
                  type="radio"
                  label="عادی (تحویل ۶ روزه)"
                  name="orderType"
                  value="normal"
                  checked={formData.orderType === "normal"}
                  onChange={handleChange}
                />
               <Form.Check
                 inline
                 type="radio"
                 label="فوری (تحویل ۳ روزه)"
                 name="orderType"
                 value="urgent"
                 checked={formData.orderType === "urgent"}
                 onChange={handleChange}
               />
             </div>
         </Form.Group>

        {[
          { name: "intro", label: "معرفی کامل خودتون" },
          {
            name: "program",
            label:
              "چه رشته‌ای و چه مقطعی می‌خواهید اپلای کنید و چرا این برنامه مناسب شماست؟",
          },
          { name: "education", label: "سوابق تحصیلی و افتخارات" },
          { name: "work", label: "سوابق کاری مرتبط با رشته" },
          { name: "extracurricular", label: "کارهای فوق‌برنامه مفید برای ذکر" },
          { name: "teaching", label: "سابقه تدریس یا TA" },
          {
            name: "goals",
            label: "اهداف تحصیلی یا شغلی آینده و ارتباط برنامه با آن‌ها",
          },
          { name: "passion", label: "علاقه به رشته و دلایل شایستگی برای برنامه" },
          { name: "whyCountry", label: "چرا این کشور و تحصیل در خارج؟" },
          { name: "yourImpact", label: "چگونه به دانشگاه/برنامه کمک خواهید کرد؟" },
        ].map(({ name, label }) => (
          <Form.Group className="mb-3" key={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}

        <div className="text-center">
          <Button type="submit" variant="primary">
            ارسال فرم
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MotivationLetterForm;
