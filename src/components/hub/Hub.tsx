"use client";

import { useState } from "react";
import HubHero from "./HubHero";
import HubFilters from "./HubFilters";
import HubMasonry from "./HubMasonry";
import HubImageModal from "./HubImageModal";

export interface HubImage {
  id: string;
  url: string;
  prompt: string;
  createdAt: Date;
  width: number;
  height: number;
  tags?: string[];
  author: {
    name: string;
    avatar?: string;
  };
  likes: number;
  views: number;
}

// Mock data for platform-wide creations
const MOCK_HUB_IMAGES: HubImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
    prompt:
      "Neo-Tokyo streets at midnight, rain-slicked cyberpunk aesthetic with holographic advertisements",
    createdAt: new Date("2024-02-18T14:30:00"),
    width: 800,
    height: 1200,
    tags: ["cyberpunk", "city", "neon", "rain"],
    author: { name: "Alex Chen", avatar: "AC" },
    likes: 342,
    views: 1820,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    prompt:
      "Ethereal cosmic nebula with swirling stardust, deep space photography style",
    createdAt: new Date("2024-02-18T13:15:00"),
    width: 800,
    height: 600,
    tags: ["space", "cosmic", "nebula", "astronomy"],
    author: { name: "Maya Rodriguez", avatar: "MR" },
    likes: 189,
    views: 945,
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
    prompt:
      "Golden hour portrait with cinematic bokeh, fashion editorial style",
    createdAt: new Date("2024-02-18T11:45:00"),
    width: 800,
    height: 1000,
    tags: ["portrait", "fashion", "golden hour", "editorial"],
    author: { name: "James Park", avatar: "JP" },
    likes: 567,
    views: 2340,
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
    prompt:
      "Minimalist luxury perfume bottle on marble pedestal, studio lighting",
    createdAt: new Date("2024-02-18T10:20:00"),
    width: 800,
    height: 800,
    tags: ["product", "minimal", "luxury", "still life"],
    author: { name: "Sofia Martins", avatar: "SM" },
    likes: 423,
    views: 1678,
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800",
    prompt:
      "Misty mountain peaks at dawn with dramatic light rays breaking through clouds",
    createdAt: new Date("2024-02-18T09:30:00"),
    width: 800,
    height: 500,
    tags: ["landscape", "mountains", "nature", "atmospheric"],
    author: { name: "David Kumar", avatar: "DK" },
    likes: 298,
    views: 1456,
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    prompt:
      "Fantasy warrior princess with glowing crystal armor in enchanted forest",
    createdAt: new Date("2024-02-18T08:00:00"),
    width: 800,
    height: 1100,
    tags: ["fantasy", "character", "magic", "concept art"],
    author: { name: "Emma Liu", avatar: "EL" },
    likes: 891,
    views: 3521,
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1614853035111-1e6023c82ff6?w=800",
    prompt:
      "Brutalist concrete architecture with geometric shadows and sharp angles",
    createdAt: new Date("2024-02-17T20:45:00"),
    width: 800,
    height: 950,
    tags: ["architecture", "brutalist", "geometric", "concrete"],
    author: { name: "Marcus Weber", avatar: "MW" },
    likes: 234,
    views: 987,
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800",
    prompt:
      "Dramatic sunset over crashing ocean waves with vibrant orange and purple sky",
    createdAt: new Date("2024-02-17T18:20:00"),
    width: 800,
    height: 600,
    tags: ["seascape", "sunset", "ocean", "dramatic"],
    author: { name: "Isla Thompson", avatar: "IT" },
    likes: 445,
    views: 1823,
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800",
    prompt:
      "Surreal floating islands with impossible geometry and dreamlike atmosphere",
    createdAt: new Date("2024-02-17T16:15:00"),
    width: 800,
    height: 1050,
    tags: ["surreal", "fantasy", "floating", "dreamlike"],
    author: { name: "Luca Rossi", avatar: "LR" },
    likes: 612,
    views: 2567,
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
    prompt:
      "Macro close-up of iridescent crystal formations with rainbow reflections",
    createdAt: new Date("2024-02-17T14:30:00"),
    width: 800,
    height: 800,
    tags: ["macro", "abstract", "crystal", "iridescent"],
    author: { name: "Yuki Tanaka", avatar: "YT" },
    likes: 378,
    views: 1645,
  },
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800",
    prompt:
      "Retro-futuristic spaceship interior with analog controls and warm lighting",
    createdAt: new Date("2024-02-17T12:00:00"),
    width: 800,
    height: 1000,
    tags: ["sci-fi", "retro", "spaceship", "interior"],
    author: { name: "Nina Kowalski", avatar: "NK" },
    likes: 523,
    views: 2134,
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
    prompt: "Abstract fluid art with metallic gold and deep blue swirls",
    createdAt: new Date("2024-02-17T10:45:00"),
    width: 800,
    height: 600,
    tags: ["abstract", "fluid art", "metallic", "elegant"],
    author: { name: "Omar Hassan", avatar: "OH" },
    likes: 267,
    views: 1098,
  },
];

export default function Hub() {
  const [images] = useState<HubImage[]>(MOCK_HUB_IMAGES);
  const [selectedImage, setSelectedImage] = useState<HubImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredImages = images.filter((img) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        img.prompt.toLowerCase().includes(query) ||
        img.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        img.author.name.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 px-4 py-10 max-w-400 mx-auto">
      {/* Hero */}
      <HubHero totalCreations={images.length} />

      {/* Filters */}
      <HubFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Masonry Grid */}
      {filteredImages.length > 0 ? (
        <HubMasonry images={filteredImages} onImageClick={setSelectedImage} />
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-zinc-400 text-lg mb-2">No creations found</p>
          <p className="text-zinc-600 text-sm">Try a different search term</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <HubImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
