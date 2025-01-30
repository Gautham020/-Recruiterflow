import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ title, description, id, onDelete }) => {
  const [isHovered, setIsHovered] = useState(true);

  return (
    <div
      className="relative bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300 "
      onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{id}</h3>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>

      <AnimatePresence>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, translateZ: 0 }}
            animate={{ opacity: 1, scale: 1, translateZ: 10 }}
            exit={{ opacity: 0, scale: 0.8, translateZ: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className=" mt-7 bg-red-500 text-white px-4 py-2 px-10 rounded-full shadow-2xl hover:bg-[#77CDFF] focus:outline-none"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.2s ease-in-out",
            }}
            whileHover={{ scale: 1.1, rotateX: 10, rotateY: -10 }}
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
