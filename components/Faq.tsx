import React, { useState } from 'react';
import { StepLabel } from './StepLabel';

const faqData = [
  {
    question: "Q: What is Asorock's social mission?",
    answer: "A: Asorock is dedicated to building free libraries in African villages to promote literacy and education. Customers become part of this legacy as their names are engraved on a 'Thank You' Pillar at the library site."
  },
  {
    question: 'Q: What is the warranty on Asorock products?',
    answer: 'A: All Asorock products, including both luxury timepieces and AR Fragrances, are backed by a comprehensive 24-Month Warranty for your peace of mind.'
  },
  {
    question: 'Q: Are the AR Fragrances long-lasting?',
    answer: 'A: Yes. They are crafted as Extrait de Parfums, the highest concentration in perfumery (30-40% oil), ensuring a rich, complex, and long-lasting scent experience.'
  }
];

const FaqItem: React.FC<{ item: { question: string, answer: string } }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-600">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-200 hover:bg-gray-600/50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-blue-400">{item.question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-gray-400">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};


const Faq: React.FC = () => {
  return (
    <div className="space-y-4">
      <StepLabel step={5} label="Frequently Asked Questions" />
      <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg overflow-hidden">
        {faqData.map((item, index) => (
          <FaqItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Faq;