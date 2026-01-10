import React from "react";
import { motion } from "framer-motion";
import {
  FaLaptop,
  FaUsers,
  FaClipboardCheck,
  FaSyncAlt,
  FaChartPie,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    title: "Asset Tracking",
    description:
      "Track all company assets in real-time with complete visibility and accuracy.",
    icon: <FaLaptop />,
  },
  {
    title: "Employee Management",
    description:
      "Manage employees and their assigned assets across multiple departments.",
    icon: <FaUsers />,
  },
  {
    title: "Approval Workflow",
    description:
      "Streamlined asset request and approval system for HR managers.",
    icon: <FaClipboardCheck />,
  },
  {
    title: "Return Management",
    description:
      "Easily track returnable assets and maintain accurate inventory records.",
    icon: <FaSyncAlt />,
  },
  {
    title: "Analytics & Reports",
    description:
      "Visual reports and insights to understand asset usage and trends.",
    icon: <FaChartPie />,
  },
  {
    title: "Secure Access",
    description:
      "Role-based authentication ensures data security and accountability.",
    icon: <FaShieldAlt />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Everything you need to manage company assets efficiently in one
            platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
