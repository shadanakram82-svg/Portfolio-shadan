import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const Contact = () => {
  const [btnText, setBtnText] = useState('Send Message');
  const [isSending, setIsSending] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    setIsSending(true);
    setBtnText("Sending...");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setBtnText("Message Sent!");
        form.current.reset();

        setTimeout(() => {
          setBtnText("Send Message");
          setIsSending(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);

        setBtnText("Failed!");
        setIsSending(false);

        setTimeout(() => {
          setBtnText("Send Message");
        }, 3000);
      });

  };




  return (

    <section id="contact">
      <div className="container !px-4 md:!px-8 lg:!px-16">
        <div className="text-center mb-5 reveal">
          <h2 className="section-title">Get In <span className="accent">Touch</span></h2>
          <p style={{ color: 'var(--clr-muted)', maxWidth: '480px', margin: '0 auto' }} className="!text-sm md:!text-base">
            Have a project idea or just want to say hi? My inbox is always open.
          </p>
        </div>
        <div className="contact-layout !flex !flex-col lg:!flex-row !gap-12 lg:!gap-24">
          <div className="contact-info-col reveal-left !w-full lg:!w-1/3">
            <div className="contact-info-item">
              <div className="ci-icon"><i className="fas fa-envelope"></i></div>
              <div>
                <div className="ci-label">EMAIL</div>
                <div className="ci-value !text-sm md:!text-base">shadanakram82@gmail.com</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="ci-icon"><i className="fas fa-phone"></i></div>
              <div>
                <div className="ci-label">PHONE</div>
                <div className="ci-value !text-sm md:!text-base">+91 8235446677</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="ci-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div>
                <div className="ci-label">LOCATION</div>
                <div className="ci-value !text-sm md:!text-base">Malout, Punjab</div>
              </div>
            </div>
            <div className="social-links !justify-center lg:!justify-start !mt-8">
              <a href="https://github.com/shadanakram82-svg" className="social-btn"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/shadan-akram-36167135a/" className="social-btn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/shadan_akram09/" className="social-btn"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className="contact-form-col reveal-right !w-full lg:!w-2/3">
            <div className="contact-form !p-6 md:!p-8">

              <form ref={form} onSubmit={sendEmail}>

  <div className="form-row-2 !flex !flex-col md:!flex-row !gap-4 md:!gap-6">

    <div className="form-group !w-full">
      <label className="form-label">YOUR NAME</label>
      <input
        type="text"
        name="from_name"
        className="form-control-custom !w-full"
        placeholder="XYZ"
        required
      />
    </div>

    <div className="form-group !w-full">
      <label className="form-label">EMAIL ADDRESS</label>
      <input
        type="email"
        name="from_email"
        className="form-control-custom !w-full"
        placeholder="XYZ@email.com"
        required
      />
    </div>

  </div>

  <div className="form-group !mt-4 md:!mt-6">
    <label className="form-label">SUBJECT</label>
    <input
      type="text"
      name="subject"
      className="form-control-custom !w-full"
      placeholder="Project Inquiry"
    />
  </div>

  <div className="form-group !mt-4 md:!mt-6">
    <label className="form-label">MESSAGE</label>
    <textarea
      name="message"
      className="form-control-custom !w-full"
      placeholder="Tell me about your project..."
      rows="6"
      required
    ></textarea>
  </div>

  <button
    type="submit"
    className="btn-primary-custom send-btn !mt-6 !w-full md:!w-auto"
    disabled={isSending}
    style={
      isSending
        ? {
            background:
              "linear-gradient(90deg,var(--clr-accent),var(--clr-accent2))",
          }
        : {}
    }
  >
    {isSending ? (
      <>
        <i className="fas fa-spinner fa-spin me-2"></i>
        {btnText}
      </>
    ) : (
      <>
        <i className="fas fa-paper-plane me-2"></i>
        {btnText}
      </>
    )}
  </button>

</form>

          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Contact;
