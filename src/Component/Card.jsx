import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ title, description,id, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <h3 className="text-xl font-bold text-gray-800 mb-2">{id}</h3>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>

      <AnimatePresence>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-[#77CDFF] focus:outline-none"
            onClick={onDelete}
          >
            Delete
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
