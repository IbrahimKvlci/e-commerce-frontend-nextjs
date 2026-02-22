"use client"

import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";

export default function ProductImageGallery({ imagesUrl }: { imagesUrl: string[] }) {
    const [selectedImage, setSelectedImage] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setSelectedImage(index);
    };

    const placeholderImage = PLACEHOLDER_IMAGE_URL;

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-6">
            {/* Thumbnails (Vertical on desktop) */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {imagesUrl.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${index === selectedImage ? 'border-neutral-900' : 'border-transparent hover:border-neutral-200'}`}>
                        <img
                            src={image}
                            alt={`Thumbnail ${index}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-square bg-neutral-100 rounded-3xl overflow-hidden group">
                <img
                    src={imagesUrl[selectedImage] ?? placeholderImage}
                    alt="SonicMaster Pro Headphones"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
            </div>
        </div>
    )
}