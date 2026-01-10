import React from "react";
import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <section className="relative max-w-7xl mx-auto bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url('https://i.ibb.co/ymjfJPmt/alex-kotliarskyi-QBp-ZGq-EMs-Kg-unsplash.jpg')`, // production-ready local image recommended
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative px-6 py-32 md:py-40 text-center md:text-left">
        {/* Motion Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-3xl mx-auto md:mx-0"
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4"
          >
            Manage Your <span className="text-purple-400 opacity-100">Assets</span> Effortlessly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-2xl font-semibold text-gray-200 mb-8"
          >
            Track, allocate, and optimize company assets with ease and efficiency.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex justify-center md:justify-start gap-4 flex-wrap"
          >
            <a
              href="#register"
              className="btn btn-primary btn-lg focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
            >
              Get Started
            </a>
           <a
  href="#learn-more"
  className="btn btn-outline btn-lg text-purple-400 border-2 opacity-100 border-purple-500 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 transition-colors duration-300"
>
  Learn More
</a>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
