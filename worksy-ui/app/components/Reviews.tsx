"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  section: "py-20 md:py-28 bg-white dark:bg-zinc-950",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  header: "text-center mb-16 opacity-0 animate-on-scroll",
  title: "text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-white mb-4",
  subtitle: "text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto",
  carouselWrapper: "relative opacity-0 animate-on-scroll",
  navButton: "absolute top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 rounded-full p-3 shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700",
  prevButton: "left-2 md:-left-4",
  nextButton: "right-2 md:-right-4",
  navIcon: "w-5 h-5 text-zinc-700 dark:text-zinc-300",
  reviewsContainer: "overflow-hidden",
  reviewsTrack: "flex transition-transform duration-500 ease-in-out",
  reviewSlide: "w-full md:w-1/3 flex-shrink-0 px-4 md:px-3",
  reviewCard: "bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 h-full border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow",
  userInfo: "flex items-center gap-4 mb-4",
  avatar: "w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white font-semibold text-xl",
  userName: "font-semibold text-zinc-900 dark:text-white",
  service: "text-sm text-zinc-600 dark:text-zinc-400",
  ratingWrapper: "mb-4",
  starsContainer: "flex gap-1",
  star: "w-5 h-5",
  starFilled: "text-yellow-400 fill-current",
  starEmpty: "text-zinc-300 dark:text-zinc-600",
  comment: "text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed",
  dotsContainer: "flex justify-center gap-2 mt-8",
  dot: "h-2 rounded-full transition-all duration-200",
  dotActive: "w-8 bg-accent",
  dotInactive: "w-2 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500 cursor-pointer",
};

export default function Reviews() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const reviews = t.reviews.items;

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  // Reset index if it's out of bounds after resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom', 'duration-700');
              (entry.target as HTMLElement).style.opacity = '1';
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const renderStars = (rating: number) => {
    return (
      <div className={classes.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`${classes.star} ${i < rating ? classes.starFilled : classes.starEmpty}`}
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        {/* Header */}
        <div className={classes.header}>
          <h2 className={classes.title}>
            {t.reviews.title}
          </h2>
          <p className={classes.subtitle}>
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className={classes.carouselWrapper}>
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className={`${classes.navButton} ${classes.prevButton}`}
            aria-label="Previous reviews"
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
            onClick={goToNext}
            className={`${classes.navButton} ${classes.nextButton}`}
            aria-label="Next reviews"
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

          {/* Reviews Container */}
          <div className={classes.reviewsContainer}>
            <div
              className={classes.reviewsTrack}
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={classes.reviewSlide}
                >
                  <div className={classes.reviewCard}>
                    {/* User Info */}
                    <div className={classes.userInfo}>
                      <div className={classes.avatar}>
                        {getInitials(review.name)}
                      </div>
                      <div>
                        <h3 className={classes.userName}>
                          {review.name}
                        </h3>
                        <p className={classes.service}>
                          {review.service}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className={classes.ratingWrapper}>{renderStars(review.rating)}</div>

                    {/* Comment */}
                    <p className={classes.comment}>
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className={classes.dotsContainer}>
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`${classes.dot} ${
                  index === currentIndex
                    ? classes.dotActive
                    : classes.dotInactive
                }`}
                aria-label={`Go to review set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
