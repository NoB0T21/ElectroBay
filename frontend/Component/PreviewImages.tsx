'use client'

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

type Props = {
  images: { url: string }[];
};

const PreviewImages = ({ images }: Props) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const paginate = (newDirection: 1 | -1) => {
    setDirection(newDirection);
    setIndex((prev) => wrap(0, images.length, prev + newDirection));
  };

  const current = wrap(0, images.length, index);
  const prev = wrap(0, images.length, index - 1);
  const next = wrap(0, images.length, index + 1);
  const hidden = wrap(0, images.length, index + 2);

  // dynamically order based on direction
  const getImageRole = (imgIndex: number): "prev" | "current" | "next" | "hidden" | null => {
    if (imgIndex === current) return "current";
    if (direction === 1) {
      if (imgIndex === prev) return "prev";
      if (imgIndex === next) return "next";
      if (imgIndex === hidden) return "hidden";
    } else {
      if (imgIndex === next) return "next";
      if (imgIndex === prev) return "prev";
      if (imgIndex === wrap(0, images.length, index - 2)) return "hidden";
    }
    return null;
  };

  const getProps = (role: string) => {
    switch (role) {
      case "prev":
        return { x: -220, scale: 0.6, zIndex: 5 };
      case "current":
        return { x: 0, scale: 1, zIndex: 20 };
      case "next":
        return { x: 220, scale: 0.6, zIndex: 5 };
      case "hidden":
        return { x: 50, scale: 0.1, zIndex: 0, opacity: 0};
      default:
        return { opacity: 0 };
    }
  };

  return (
    <div className="relative flex flex-col items-center mx-auto py-10 w-full max-w-5xl">
      <div className="flex gap-10 mb-6">
        <button
          onClick={() => paginate(1)}
          className="bg-gray-700 px-4 py-2 rounded text-white"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(-1)}
          className="bg-gray-700 px-4 py-2 rounded text-white"
        >
          Next
        </button>
      </div>

      <div className="relative flex justify-center items-center w-full h-96 overflow-hidden">
        {images.map((img, i) => {
          const role = getImageRole(i);
          if (!role) return null;

          const props = getProps(role);

          return (
            <AnimatePresence mode="wait">
            <motion.div
              key={i}
              layout
              animate={props}
              exit={{x:0,scale: 0.1}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute"
              style={{ zIndex: props.zIndex ?? 1 }}
            >
              <Image
                src={img.url}
                alt={`Image ${i}`}
                width={role === "current" ? 300 : 200}
                height={role === "current" ? 300 : 200}
                className="rounded-xl"
              />
            </motion.div></AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewImages;
