"use client";

import { useState } from "react";

const classes = {
  card: "bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-zinc-200 dark:border-zinc-800",
  carouselSection: "relative h-48 bg-zinc-100 dark:bg-zinc-800",
  carouselImage: "w-full h-full object-cover",
  carouselNav: "absolute inset-0 flex items-center justify-between p-2",
  navButton: "bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-white dark:hover:bg-zinc-700 transition-colors",
  navIcon: "w-4 h-4 text-zinc-900 dark:text-zinc-50",
  carouselDots: "absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1",
  dot: "w-1.5 h-1.5 rounded-full transition-all",
  dotActive: "bg-white w-4",
  dotInactive: "bg-white/50",
  content: "p-5",
  header: "flex items-start gap-3 mb-3",
  logo: "w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md",
  info: "flex-1 min-w-0",
  companyName: "font-semibold text-lg text-zinc-900 dark:text-zinc-50 truncate",
  location: "text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1",
  locationIcon: "w-3.5 h-3.5",
  ratingSection: "flex items-center gap-2 mb-4",
  stars: "flex items-center gap-0.5",
  star: "w-4 h-4",
  starFilled: "text-yellow-400 fill-current",
  starEmpty: "text-zinc-300 dark:text-zinc-600",
  ratingText: "text-sm font-medium text-zinc-900 dark:text-zinc-50",
  reviewCount: "text-sm text-zinc-500 dark:text-zinc-400",
  servicesSection: "flex flex-wrap gap-2",
  serviceChip: "px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-lg border border-blue-100 dark:border-blue-800",
  moreChip: "px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded-lg",
};

interface ProviderCardProps {
  companyName: string;
  services: readonly string[];
  rating: number;
  reviewCount: number;
  location: string;
  logo: string;
  photos: readonly string[];
}

export default function ProviderCard({
  companyName,
  services,
  rating,
  reviewCount,
  location,
  logo,
  photos,
}: ProviderCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const renderStars = (rating: number) => {
    return (
      <div className={classes.stars}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`${classes.star} ${i < Math.floor(rating) ? classes.starFilled : classes.starEmpty}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const displayedServices = services.slice(0, 5);
  const remainingCount = services.length - 5;

  return (
    <div className={classes.card}>
      {/* Photo Carousel - Top 40% */}
      <div className={classes.carouselSection}>
        {/* Placeholder gradient background for demo */}
        <div className={classes.carouselImage}>
          <div
            className="w-full h-full flex items-center justify-center text-6xl"
            style={{
              background: `linear-gradient(135deg,
                ${currentPhotoIndex === 0 ? '#3b82f6, #6366f1' :
                  currentPhotoIndex === 1 ? '#10b981, #059669' :
                  '#f59e0b, #d97706'})`
            }}
          >
            {currentPhotoIndex === 0 ? '🏠' : currentPhotoIndex === 1 ? '🔧' : '✨'}
          </div>
        </div>

        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <div className={classes.carouselNav}>
            <button
              onClick={goToPrevPhoto}
              className={classes.navButton}
              aria-label="Previous photo"
            >
              <svg
                className={classes.navIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNextPhoto}
              className={classes.navButton}
              aria-label="Next photo"
            >
              <svg
                className={classes.navIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Dots Indicator */}
        {photos.length > 1 && (
          <div className={classes.carouselDots}>
            {photos.map((_, index) => (
              <div
                key={index}
                className={`${classes.dot} ${index === currentPhotoIndex ? classes.dotActive : classes.dotInactive}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={classes.content}>
        {/* Header with Logo and Company Info */}
        <div className={classes.header}>
          <div className={classes.logo}>{logo}</div>
          <div className={classes.info}>
            <h3 className={classes.companyName}>{companyName}</h3>
            <div className={classes.location}>
              <svg
                className={classes.locationIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className={classes.ratingSection}>
          {renderStars(rating)}
          <span className={classes.ratingText}>{rating.toFixed(1)}</span>
          <span className={classes.reviewCount}>({reviewCount} reviews)</span>
        </div>

        {/* Services Chips */}
        <div className={classes.servicesSection}>
          {displayedServices.map((service, index) => (
            <span key={index} className={classes.serviceChip}>
              {service}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className={classes.moreChip}>+{remainingCount} more</span>
          )}
        </div>
      </div>
    </div>
  );
}
