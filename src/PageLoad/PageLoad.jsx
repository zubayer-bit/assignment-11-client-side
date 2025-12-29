import React from 'react';
import { motion } from "framer-motion";

const PageLoad = () => {
    return (
       <div className="flex justify-center items-center min-h-screen bg-gray-900">
             <motion.div
               className="w-16 h-16 border-4 border-t-transparent border-cyan-400 rounded-full"
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
             />
           </div>
    );
};

export default PageLoad;