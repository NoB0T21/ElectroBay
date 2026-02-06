'use client'

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  images: { url: string, background: string }[];
};

const PreviewImages = ({ images }: Props) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-400">No images</p>;
  }

  const paginate = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div className="relative flex flex-col justify-center items-center py-10">
      <div className="relative h-80 w-80 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            <Image
              src={images[index]?.url}
              alt="preview"
              width={300}
              height={300}
              style={{ backgroundColor: images?.[index]?.background || '#f3f4f6' }}
              className="rounded-xl shadow-sm object-contain border border-gray-100"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center w-full gap-6 mb-4">
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm" onClick={() => paginate(-1)}>Prev</button>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm" onClick={() => paginate(1)}>Next</button>
      </div>
    </div>
  );
};

export default PreviewImages;
