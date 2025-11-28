"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const classes = {
  nav: "w-full bg-white/95 dark:bg-zinc-900/95 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 backdrop-blur-xl shadow-sm transition-all duration-300",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  navInner: "flex justify-between items-center h-16",
  logo: "text-xl font-semibold text-zinc-900 dark:text-white hover:text-accent dark:hover:text-accent transition-colors duration-200",
  desktopNav: "hidden md:flex space-x-1 items-center",
  navLink: "text-sm text-zinc-700 dark:text-zinc-300 hover:text-accent dark:hover:text-accent transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800",
  dropdownContainer: "relative group",
  dropdownButton: "text-sm text-zinc-700 dark:text-zinc-300 hover:text-accent dark:hover:text-accent transition-colors duration-200 flex items-center gap-1 font-medium px-3 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800",
  dropdownIcon: "w-4 h-4 transition-transform duration-200 group-hover:rotate-180",
  dropdown: "absolute top-full left-0 mt-2 w-60 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden transition-all duration-200 z-50",
  dropdownHeader: "px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700",
  dropdownLinkPrimary: "block px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 hover:bg-accent/10 hover:text-accent transition-all duration-150 font-semibold",
  dropdownLink: "block px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all duration-150 font-medium border-b border-zinc-100 dark:border-zinc-800 last:border-b-0",
  hamburger: "md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors",
  hamburgerLine: "block w-6 h-0.5 bg-zinc-700 dark:bg-zinc-300 transition-all duration-300 rounded-full",
  mobileMenu: "md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800",
  mobileMenuContent: "py-4 px-4 space-y-2",
  mobileSubmenu: "mt-2 ml-4 space-y-1 pl-3 border-l-2 border-zinc-300 dark:border-zinc-700",
  mobileDivider: "pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800",
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { t } = useTranslation();

  const serviceGroups = [
    { name: t.serviceGroups.home, href: "/services/category/home" },
    { name: t.serviceGroups.exterior, href: "/services/category/exterior" },
    { name: t.serviceGroups.garden, href: "/services/category/garden" },
    { name: t.serviceGroups.design, href: "/services/category/design" },
    { name: t.serviceGroups.events, href: "/services/category/events" },
    { name: t.serviceGroups.other, href: "/services/category/other" },
  ];

  return (
    <nav className={classes.nav}>
      <div className={classes.container}>
        <div className={classes.navInner}>
          <div className="flex-shrink-0">
            <Link href="/" className={classes.logo}>
              Worksy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={classes.desktopNav}>
            <Link href="/" className={classes.navLink}>
              {t.nav.home}
            </Link>

            {/* Services Dropdown */}
            <div
              className={classes.dropdownContainer}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={classes.dropdownButton}>
                {t.nav.services}
                <svg
                  className={`${classes.dropdownIcon} ${isServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`${classes.dropdown} ${
                  isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className={classes.dropdownHeader}>
                  <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                    Browse by Category
                  </div>
                </div>
                <Link href="/services" className={classes.dropdownLinkPrimary}>
                  {t.nav.allServices}
                </Link>
                {serviceGroups.map((group) => (
                  <Link key={group.href} href={group.href} className={classes.dropdownLink}>
                    {group.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/providers" className={classes.navLink}>
              {t.nav.providers}
            </Link>

            <Link href="/about" className={classes.navLink}>
              {t.nav.about}
            </Link>

            <LanguageSwitcher />
          </div>

          {/* Mobile Hamburger Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={classes.hamburger} aria-label="Toggle menu">
            <span
              className={`${classes.hamburgerLine} ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span className={`${classes.hamburgerLine} ${isMenuOpen ? "opacity-0" : ""}`} />
            <span
              className={`${classes.hamburgerLine} ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${classes.mobileMenu} ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={classes.mobileMenuContent}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className={`${classes.navLink} block`}>
              {t.nav.home}
            </Link>

            {/* Mobile Services Section */}
            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`w-full text-left ${classes.navLink} flex items-center justify-between`}
              >
                {t.nav.services}
                <svg
                  className={`${classes.dropdownIcon} ${isServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className={classes.mobileSubmenu}>
                  <Link href="/services" onClick={() => setIsMenuOpen(false)} className={`${classes.navLink} block`}>
                    {t.nav.allServices}
                  </Link>
                  {serviceGroups.map((group) => (
                    <Link
                      key={group.href}
                      href={group.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`${classes.navLink} block`}
                    >
                      {group.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/providers" onClick={() => setIsMenuOpen(false)} className={`${classes.navLink} block`}>
              {t.nav.providers}
            </Link>

            <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`${classes.navLink} block`}>
              {t.nav.about}
            </Link>

            <div className={classes.mobileDivider}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
