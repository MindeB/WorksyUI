"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const classes = {
  nav: "w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 relative z-50",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  navInner: "flex justify-between items-center h-16",
  logo: "text-xl font-bold text-zinc-900 dark:text-zinc-50",
  desktopNav: "hidden md:flex space-x-8 items-center",
  navLink: "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors",
  dropdownContainer: "relative",
  dropdownButton: "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors flex items-center gap-1",
  dropdownIcon: "w-4 h-4 transition-transform",
  dropdown: "absolute top-full left-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-200 z-50",
  dropdownLinkPrimary: "block px-4 py-3 text-zinc-900 dark:text-zinc-50 hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors font-semibold border-b border-zinc-200 dark:border-zinc-800",
  dropdownLink: "block px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors",
  hamburger: "md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5",
  hamburgerLine: "block w-6 h-0.5 bg-zinc-900 dark:bg-zinc-50 transition-all duration-300",
  mobileMenu: "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
  mobileMenuContent: "py-4 space-y-4",
  mobileSubmenu: "mt-2 ml-4 space-y-2",
  mobileDivider: "pt-4 border-t border-zinc-200 dark:border-zinc-800",
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { t } = useTranslation();

  const serviceGroups = [
    { name: t.serviceGroups.interior, href: "/services/group/interior" },
    { name: t.serviceGroups.exterior, href: "/services/group/exterior" },
    { name: t.serviceGroups.lawnGarden, href: "/services/group/lawn-garden" },
    { name: t.serviceGroups.additional, href: "/services/group/additional" },
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
