import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaUsers, FaLaptop } from "react-icons/fa";

const stats = [
  {
    value: "100+",
    label: "Companies Trust Us",
    icon: <FaBuilding />,
  },
  {
    value: "5,000+",
    label: "Assets Managed",
    icon: <FaLaptop />,
  },
  {
    value: "10,000+",
    label: "Employees Supported",
    icon: <FaUsers />,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Manager, TechNova Ltd.",
    feedback:
      "AssetVerse has completely transformed how we track and manage company assets. The workflow is smooth and reliable.",
  },
  {
    name: "Michael Lee",
    role: "Operations Head, CoreSoft Inc.",
    feedback:
      "The multi-company support and approval system make AssetVerse a perfect fit for growing businesses.",
  },
  {
    name: "Ayesha Rahman",
    role: "HR Lead, FinEdge Solutions",
    feedback:
      "Clean UI, powerful features, and excellent asset visibility. Highly recommended for HR teams.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="card bg-base-100 shadow-md text-center"
            >
              <div className="card-body">
                <div className="text-4xl text-primary mb-2">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-primary">
                  {stat.value}
                </h3>
                <p className="text-secondary mt-1">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Trusted by HR teams and organizations across various industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="card-body">
                <p className="text-secondary italic mb-4">
                  “{testimonial.feedback}”
                </p>
                <h4 className="font-semibold text-primary">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-secondary">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
