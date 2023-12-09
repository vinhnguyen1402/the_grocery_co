import React, { useState } from "react";
import "./FAQ.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const FaqItem = ({ question, answer }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const toggleAnswer = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleAnswer}>
        <strong>{question}</strong>
      </div>
      {isAnswerVisible && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <div>
      <Header />
      <div className="splash-container">
        <img src={require("../../images/home.png")} alt="Home" />
      </div>
      <div className="faqContainer">
        <h1>Frequently Asked Questions</h1>
        <FaqItem
          question="What are your store hours?"
          answer="Our store is open from Monday to Sunday: Monday - Friday: 8:00 AM to 10:00 PM. Saturday - Sunday: 9:00 AM to 8:00 PM"
        />
        <FaqItem
          question="Do you offer online shopping?"
          answer="Yes, we provide online shopping services. You can browse our products on our website and place an order for delivery or pickup."
        />
        <FaqItem
          question="What payment methods do you accept?"
          answer="We accept various payment methods, including credit/debit cards, cash, and online payment systems for online orders."
        />
      </div>
      <Footer />

      {/* Add more FAQ items as needed */}
    </div>
  );
};

export default FAQ;
