import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRegLightbulb,
  FaClipboardList,
  FaRocket,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaRegLightbulb size={30} />,
    title: "Plan Your Assets",
    desc: "Organize and allocate your company assets efficiently with AssetVerse.",
  },
  {
    icon: <FaClipboardList size={30} />,
    title: "Track & Monitor",
    desc: "Keep track of all assigned assets and employee usage in real-time.",
  },
  {
    icon: <FaRocket size={30} />,
    title: "Optimize Workflow",
    desc: "Make informed decisions and optimize resource allocation effortlessly.",
  },
];

const faqs = [
  {
    question: "How do I register as an HR manager?",
    answer:
      "Go to the 'Join as HR Manager' page from the navbar and fill in the registration form with your company details.",
  },
  {
    question: "Can I manage multiple employees?",
    answer:
      "Yes, HR managers can manage multiple employees and assign assets to each employee efficiently.",
  },
  {
    question: "Is AssetVerse secure?",
    answer:
      "Absolutely! We follow industry-standard security protocols to protect your company data.",
  },
];

const ExtraSections = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
            Follow these simple steps to manage your assets efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-primary mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-secondary">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
            Get answers to the most common queries
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4 mb-20">
            
          {faqs.map((faq, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              className="bg-base-100 p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center text-left font-semibold text-primary"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openFAQ === index ? (
                  <FaChevronUp className="ml-2 text-secondary" />
                ) : (
                  <FaChevronDown className="ml-2 text-secondary" />
                )}
              </button>
              {openFAQ === index && (

                <p className="mt-2 text-secondary">{faq.answer}</p>

              )}
            </motion.div>
          ))}
        </div>

        {/* Contact CTA Section */}

     <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="bg-primary text-white rounded-xl p-10 text-center flex flex-col items-center justify-center space-y-4"
>
  {/* Title */}
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-3xl md:text-4xl font-bold"
  >
    Ready to get started?
  </motion.h2>

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="text-lg md:text-xl max-w-xl"
  >
    Join AssetVerse today and simplify your asset management!
  </motion.p>

  {/* Attention-grabbing CTA text */}
  <motion.span
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="text-2xl md:text-3xl font-bold text-secondary cursor-default"
  >
    Take the first step towards smarter asset management
  </motion.span>
</motion.div>


      </div>
    </section>
  );
};

export default ExtraSections;
