"use client";

import { useState } from "react";

const classes = {
  card: "group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800 hover:border-accent cursor-pointer transform hover:-translate-y-1",
  carouselSection: "relative h-48 bg-zinc-100 dark:bg-zinc-800 overflow-hidden",
  carouselImage: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
  overlay: "absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  carouselNav: "absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  navButton: "bg-white/90 dark:bg-zinc-800/90 rounded-lg p-2 hover:bg-white dark:hover:bg-zinc-700 transition-colors duration-200 shadow-md",
  navIcon: "w-4 h-4 text-zinc-700 dark:text-zinc-300",
  carouselDots: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5",
  dot: "w-2 h-2 rounded-full transition-all duration-200",
  dotActive: "bg-white shadow-md w-6",
  dotInactive: "bg-white/60 hover:bg-white/80",
  badge: "absolute top-3 right-3 px-3 py-1 bg-accent rounded-lg text-xs font-semibold text-white shadow-md",
  content: "p-5",
  header: "flex items-start gap-3 mb-4",
  logo: "w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-white font-semibold text-lg flex-shrink-0 shadow-sm",
  info: "flex-1 min-w-0",
  companyName: "font-semibold text-lg text-zinc-900 dark:text-white truncate mb-1 group-hover:text-accent transition-colors duration-200",
  location: "text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-1",
  locationIcon: "w-4 h-4 text-zinc-500 dark:text-zinc-500",
  ratingSection: "flex items-center gap-2 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800",
  stars: "flex items-center gap-0.5",
  star: "w-4 h-4 transition-transform duration-200",
  starFilled: "text-yellow-400 fill-current",
  starEmpty: "text-zinc-300 dark:text-zinc-700",
  ratingText: "text-sm font-semibold text-zinc-900 dark:text-white",
  reviewCount: "text-sm text-zinc-600 dark:text-zinc-400",
  servicesSection: "flex flex-wrap gap-2",
  serviceChip: "px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-150",
  moreChip: "px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700",
  verifiedBadge: "inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-200 dark:border-emerald-800",
  verifiedIcon: "w-3 h-3",
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
      {/* Photo Carousel */}
      <div className={classes.carouselSection}>
        {/* Overlay gradient */}
        <div className={classes.overlay} />

        {/* Top rated badge */}
        {rating >= 4.8 && (
          <div className={classes.badge}>
            ⭐ Top Rated
          </div>
        )}

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
            <div className="flex items-center gap-2 mb-1">
              <h3 className={classes.companyName}>{companyName}</h3>
              {rating >= 4.5 && (
                <span className={classes.verifiedBadge}>
                  <svg className={classes.verifiedIcon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
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
