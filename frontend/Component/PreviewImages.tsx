'use client'

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  images: { url: string }[];
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
              className="rounded-xl shadow-xl/20"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center w-full gap-6 mb-4">
        <button className="bg-[#4b7fdf] p-2 rounded-xl text-white hover:bg-[#709be9] hover:scale-108 transition-all duration-300 ease-in-out" onClick={() => paginate(-1)}>Prev</button>
        <button className="bg-[#4b7fdf] p-2 rounded-xl text-white hover:bg-[#709be9] hover:scale-108 transition-all duration-300 ease-in-out" onClick={() => paginate(1)}>Next</button>
      </div>
    </div>
  );
};

export default PreviewImages;
