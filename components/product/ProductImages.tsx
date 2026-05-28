"use client";

import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";

interface ProductImagesProps {
  images: string[];
  alt: string;
}

export function ProductImages({ images, alt }: ProductImagesProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-dark">
        <Image
          src={images[active]}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={clsx(
                "relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all",
                i === active ? "border-green-deep" : "border-cream-dark hover:border-green-mid"
              )}
              aria-label={`Image ${i + 1}`}
            >
              <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
