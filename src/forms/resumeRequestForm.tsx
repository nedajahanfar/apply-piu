import React, { useEffect, useState } from "react";
import { Accordion, Form, Button, Card } from "react-bootstrap";
import fetchEuro  from "./fetchEuroPrice";

const ResumeRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullNameFa: "",
    fullNameEn: "",
    phone: "",
    address: "",
    birthDate: "",
    email: "",
    education: "",
    workExperience: "",
    skills: "",
    certificates: "",
    projects: "",
    languages: "",
    photo: null as File | null,
    additionalDocs: null as File | null,
    receipt: null as File | null,
  });

 const [, setEuroPrice] = useState<number | null>(null);
 const [normalPrice, setNormalPrice] = useState<number | null>(null);
 const [urgentPrice, setUrgentPrice] = useState<number | null>(null);

 useEffect(() => {
  const fetchPrice = async () => {
    const euro = await fetchEuro();
    if(euro) {
      setEuroPrice(euro);
      setNormalPrice(euro * 59);
      setUrgentPrice(euro * 69);
    }
  };

  fetchPrice();

  const interval = setInterval(fetchPrice, 12 * 60 * 60 * 1000);
  return () => clearInterval(interval);
 }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, (formData as any)[key]);
    }

    await fetch("https://formspree.io/f/xrbqgkrz", {
      method: "POST",
      body: dataToSend,
    });

    alert("فرم ارسال شد.");
  };


  return (
    <div className="container mt-4 mb-5 p-4 rounded bg-light" style={{ maxWidth: "800px" }}>
      <h3 className="text-center mb-4">فرم درخواست نگارش رزومه</h3>

      <Card className="mb-3 p-3 bg-warning-subtle" dir="rtl">
        <strong>📌 راهنما:</strong>
        <ul className="mb-0">
          <li>
            بر اساس نرخ لحظه‌ای یورو، هزینه خدمات به شرح زیر محاسبه می‌شود:
            <ul>
              <li>هزینه نگارش رزومه (عادی): {normalPrice ? `${normalPrice.toLocaleString()} تومان` : "در حال دریافت..."} <br /> زمان تحویل: ۵ تا ۷ روز کاری</li>
              <li>هزینه نگارش رزومه (فوری): {urgentPrice ? `${urgentPrice.toLocaleString()} تومان` : "در حال دریافت..."} <br /> زمان تحویل: ۲ تا ۳ روز کاری</li>
            </ul>
          </li>
          <li>
            برای پرداخت، از لینک زیر استفاده کنید:
            <br />
            <a href="https://zarinp.al/applypiu" target="_blank" rel="noopener noreferrer">
              پرداخت از طریق زرین‌پرداخت
            </a>
          </li>
          <li>
            پس از پرداخت، رسید را دانلود و در قسمت پایین فرم بارگذاری نمایید.
          </li>
        </ul>
      </Card>

      <Form onSubmit={handleSubmit} dir="rtl">
        <Accordion defaultActiveKey="0" alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>اطلاعات شخصی</Accordion.Header>
            <Accordion.Body>
              {[
                { label: "نام و نام خانوادگی (فارسی)", name: "fullNameFa" },
                { label: "نام و نام خانوادگی (انگلیسی)", name: "fullNameEn" },
                { label: "شماره تماس", name: "phone", type: "tel" },
                { label: "آدرس محل سکونت با کد پستی", name: "address" },
                { label: "تاریخ تولد", name: "birthDate", type: "date" },
                { label: "ایمیل", name: "email", type: "email" },
              ].map(({ label, name, type = "text" }) => (
                <Form.Group className="mb-3" key={name}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    name={name}
                    type={type}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    required={["fullNameFa", "fullNameEn", "phone", "email"].includes(name)}
                  />
                </Form.Group>
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>سوابق تحصیلی و شغلی</Accordion.Header>
            <Accordion.Body>
              {[
                { label: "سابقه تحصیلی", name: "education" },
                { label: "تجربه کاری", name: "workExperience" },
              ].map(({ label, name }) => (
                <Form.Group className="mb-3" key={name}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name={name}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                  />
                </Form.Group>
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>مهارت‌ها و مدارک</Accordion.Header>
            <Accordion.Body>
              {[
                { label: "مهارت‌ها", name: "skills" },
                { label: "گواهی دوره‌ها", name: "certificates" },
                { label: "مقاله / پروژه", name: "projects" },
                { label: "زبان‌ها + نمره آزمون", name: "languages" },
              ].map(({ label, name }) => (
                <Form.Group className="mb-3" key={name}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name={name}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                  />
                </Form.Group>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>عکس ۳ در ۴</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, "photo")}
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>آپلود مدارک و رسید پرداخت</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3">
                <Form.Label>مدارک اضافی (اختیاری)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFileChange(e, "additionalDocs")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>رسید پرداخت</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, "receipt")}
                  required
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            ارسال فرم
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResumeRequestForm;
