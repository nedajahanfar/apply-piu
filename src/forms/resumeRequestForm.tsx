import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useEuroPrice } from "../hooks/useEuroPrice";

const MotivationLetterForm: React.FC = () => {

  type MotivationFormData = {
    firstName: string;
    lastName: string;
    email: string;
    transactionalId: string;
    intro: string;
    whyThisProgram: string;
    strengthsAndSkills: string;
    relevantExperience: string;
    academicBackground: string;
    achievements: string;
    studyGoals: string;
    professionalGoals: string;
    whyThisCountry: string;
    yourValueToProgram: string;
    orderType: "normal" | "urgent";
  };

  const [formData, setFormData] = useState<MotivationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    transactionalId: "",
    intro: "",
    whyThisProgram: "",
    strengthsAndSkills: "",
    relevantExperience: "",
    academicBackground: "",
    achievements: "",
    studyGoals: "",
    professionalGoals: "",
    whyThisCountry: "",
    yourValueToProgram: "",
    orderType: "normal", 
  });

  const { price: euroPrice, error } = useEuroPrice();

  const normalPrice = euroPrice ? euroPrice * 59 : null;
  const urgentPrice = euroPrice ? euroPrice * 69 : null;

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
          whyThisProgram: "",
          strengthsAndSkills: "",
          relevantExperience: "",
          academicBackground: "",
          achievements: "",
          studyGoals: "",
          professionalGoals: "",
          whyThisCountry: "",
          yourValueToProgram: "",
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
      <h3 className="text-center mb-4">فرم نگارش رزومه</h3>

      <Card className="mb-3 p-3 bg-warning-subtle">
        <strong>📌 راهنما:</strong>
        <ul className="mb-0">
          <li>
            مراحل پرداخت و ارسال فرم به شرح زیر است:
            <ul>
              <li>
                ۱. برای پرداخت هزینه، روی لینک زیر کلیک کنید و مبلغ را پرداخت
                کنید:
                <br />
                <a
                  href="https://zarinp.al/applypiu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  پرداخت از طریق زرین‌پرداخت
                </a>
              </li>
              <li>۲. پس از پرداخت، کد تراکنش خود را کپی کنید.</li>
              <li>۳. فرم را تکمیل کرده و کد را وارد کنید.</li>
              <li>۴. سپس فرم را ارسال نمایید.</li>
              <li>۵. با شما تماس گرفته خواهد شد.</li>
            </ul>
          </li>
          <li>
            بر اساس نرخ لحظه‌ای یورو:
            <ul>
              <li>
                سرویس عادی ( ۵ روز کاری):{" "}
                {euroPrice
                  ? `${normalPrice?.toLocaleString()} تومان`
                  : error
                  ? `خطا: ${error}`
                  : "در حال دریافت..."}
              </li>
              <li>
                سرویس فوری (۲ روز کاری):{" "}
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
        <Form.Label>نوع سفارش</Form.Label>
         <div>
         <Form.Check
          inline
          type="radio"
          label="عادی (تحویل ۵ روزه)"
          name="orderType"
          value="normal"
          checked={formData.orderType === "normal"}
          onChange={handleChange}
        />
       <Form.Check
         inline
         type="radio"
         label="فوری (تحویل ۲ روزه)"
         name="orderType"
         value="urgent"
         checked={formData.orderType === "urgent"}
         onChange={handleChange}
       />
     </div>
     </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>کد تراکنش</Form.Label>
          <Form.Control
            type="text"
            name="transactionalId"
            value={formData.transactionalId}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {[
          { name: "intro", label: "معرفی کامل خودتان و اهداف اپلای" },
          { name: "whyThisProgram", label: "چرا این رشته و این مقطع تحصیلی؟" },
          { name: "strengthsAndSkills", label: "نقاط قوت و مهارت‌های شما چیست؟" },
          { name: "relevantExperience", label: "سوابق کاری یا پژوهشی مرتبط با رشته" },
          { name: "academicBackground", label: "پیش‌زمینه علمی و درسی شما" },
          { name: "achievements", label: "افتخارات و فعالیت‌های شاخص" },
          { name: "studyGoals", label: "اهداف کوتاه‌مدت تحصیلی" },
          { name: "professionalGoals", label: "اهداف بلندمدت شغلی و حرفه‌ای" },
          { name: "whyThisCountry", label: "چرا این کشور را برای ادامه تحصیل انتخاب کردید؟" },
          { name: "yourValueToProgram", label: "چه ارزشی برای برنامه/دانشگاه به ارمغان می‌آورید؟" },
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
