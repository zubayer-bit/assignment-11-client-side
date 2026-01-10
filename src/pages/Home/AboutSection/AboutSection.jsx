import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

const AboutSection = () => {
  const benefits = [
    {
      title: "Efficient Asset Management",
      description:
        "Track and allocate company assets with complete control and efficiency.",
      icon: (
        <ClipboardDocumentCheckIcon className="h-12 w-12 text-primary mb-3" />
      ),
    },
    {
      title: "Employee Productivity",
      description:
        "Optimize resource allocation so employees can focus on what matters most.",
      icon: <UsersIcon className="h-12 w-12 text-primary mb-3" />,
    },
    {
      title: "Data-Driven Insights",
      description:
        "Monitor usage trends and asset performance with detailed analytics.",
      icon: <ChartBarIcon className="h-12 w-12 text-primary mb-3" />,
    },
    {
      title: "Secure & Reliable",
      description:
        "Your company data and assets are protected with industry-standard security.",
      icon: <CheckCircleIcon className="h-12 w-12 text-primary mb-3" />,
    },
  ];

  return (
    <section className="py-24 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Choose AssetVerse
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
            Streamline your asset management and empower your workforce with
            smart tools.
          </p>

        </motion.div>

        {/* Benefits Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit, index) => (
            
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-secondary">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
