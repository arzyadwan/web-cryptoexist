"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Post } from "@/types/sanity";
import { urlFor } from "@/lib/urlFor";

interface Props {
  posts: Post[];
}

export default function HeroSlider({ posts }: Props) {
  const [current, setCurrent] = useState(0);

  // Auto-slide setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [posts.length]);

  const nextSlide = () =>
    setCurrent(current === posts.length - 1 ? 0 : current + 1);
  const prevSlide = () =>
    setCurrent(current === 0 ? posts.length - 1 : current - 1);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl mb-12 group">
      {/* Slides */}
      {posts.map((post, index) => (
        <div
          key={post._id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image + Dark Overlay */}
          {post.mainImage && (
            <>
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient Overlay agar teks terbaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </>
          )}

          {/* Content Text */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="max-w-3xl">
              {/* Category Tag */}
              <div className="flex gap-2 mb-3">
                {index === 0 && (
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider animate-pulse">
                    Breaking News
                  </span>
                )}
                {post.categories?.slice(0, 1).map((cat) => (
                  <span
                    key={cat.slug.current}
                    className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>

              {/* Title */}
              <Link href={`/news/${post.slug.current}`}>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 hover:text-blue-300 transition">
                  {post.title}
                </h2>
              </Link>

              {/* Excerpt (Hidden on mobile) */}
              <p className="hidden md:block text-gray-300 text-lg line-clamp-2 mb-4">
                {post.excerpt}
              </p>

              <div className="flex items-center text-sm text-gray-400">
                <span>{post.author?.name}</span>
                <span className="mx-2">•</span>
                <time>
                  {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>{" "}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons (Hidden by default, Show on Hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current ? "bg-blue-500 w-6" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
