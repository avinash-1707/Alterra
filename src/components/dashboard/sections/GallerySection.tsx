"use client";

import { useState } from "react";
import GalleryHeader from "../gallery/GalleryHeader";
import GalleryMasonry from "../gallery/GalleryMasonry";
import ImageModal from "../gallery/ImageModal";
import GalleryFilters from "../gallery/GalleryFilters";

export interface GalleryImage {
  id: string;
  url: string;
  prompt: string;
  createdAt: Date;
  width: number;
  height: number;
  tags?: string[];
  favorite?: boolean;
}

// Mock data with varied aspect ratios for masonry effect
const MOCK_IMAGES: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
    prompt: "A futuristic cityscape at night with neon lights and flying cars",
    createdAt: new Date("2024-02-18T10:30:00"),
    width: 800,
    height: 1200,
    tags: ["cyberpunk", "city", "neon"],
    favorite: true,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    prompt: "Abstract cosmic nebula with swirling purple and blue clouds",
    createdAt: new Date("2024-02-18T09:15:00"),
    width: 800,
    height: 600,
    tags: ["abstract", "space", "cosmic"],
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
    prompt: "Cinematic portrait of a woman in golden hour light",
    createdAt: new Date("2024-02-17T16:45:00"),
    width: 800,
    height: 1000,
    tags: ["portrait", "cinematic", "golden hour"],
    favorite: true,
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
    prompt: "Minimalist product photography of a perfume bottle",
    createdAt: new Date("2024-02-17T14:20:00"),
    width: 800,
    height: 800,
    tags: ["product", "minimal", "luxury"],
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800",
    prompt: "Dramatic mountain landscape at sunrise with misty peaks",
    createdAt: new Date("2024-02-16T08:30:00"),
    width: 800,
    height: 500,
    tags: ["landscape", "mountains", "nature"],
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    prompt: "Ethereal fantasy character with glowing magical elements",
    createdAt: new Date("2024-02-16T11:00:00"),
    width: 800,
    height: 1100,
    tags: ["fantasy", "character", "magical"],
    favorite: true,
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1614853035111-1e6023c82ff6?w=800",
    prompt: "Modern architecture with geometric patterns and shadows",
    createdAt: new Date("2024-02-15T13:45:00"),
    width: 800,
    height: 950,
    tags: ["architecture", "geometric", "modern"],
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800",
    prompt: "Vibrant sunset over ocean waves with dramatic clouds",
    createdAt: new Date("2024-02-15T18:20:00"),
    width: 800,
    height: 600,
    tags: ["sunset", "ocean", "nature"],
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800",
    prompt: "Surreal digital art with floating geometric shapes",
    createdAt: new Date("2024-02-14T10:15:00"),
    width: 800,
    height: 1050,
    tags: ["surreal", "geometric", "digital art"],
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
    prompt: "Close-up macro photography of crystalline structures",
    createdAt: new Date("2024-02-14T15:30:00"),
    width: 800,
    height: 800,
    tags: ["macro", "abstract", "crystal"],
  },
];

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>(MOCK_IMAGES);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filterType, setFilterType] = useState<"all" | "favorites">("all");
  const [sortBy, setSortBy] = useState<"recent" | "oldest">("recent");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort logic
  const filteredImages = images
    .filter((img) => {
      if (filterType === "favorites" && !img.favorite) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          img.prompt.toLowerCase().includes(query) ||
          img.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

  const handleToggleFavorite = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, favorite: !img.favorite } : img,
      ),
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      setSelectedImage(null);
    }
  };

  return (
    <div className="space-y-6 px-4 pb-10 max-w-400 mx-auto">
      {/* Header */}
      <GalleryHeader
        totalImages={images.length}
        favoritesCount={images.filter((img) => img.favorite).length}
      />

      {/* Filters */}
      <GalleryFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Masonry Grid */}
      {filteredImages.length > 0 ? (
        <GalleryMasonry
          images={filteredImages}
          onImageClick={setSelectedImage}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-20 h-20 rounded-full bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-zinc-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-zinc-400 text-lg mb-2">No images found</p>
          <p className="text-zinc-600 text-sm">
            Try adjusting your filters or search query
          </p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
