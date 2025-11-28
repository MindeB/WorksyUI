"use client";

import { useState, useRef, useEffect } from "react";

const classes = {
  sticky: "sticky top-16 z-40 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",
  filtersRow: "flex items-center gap-3 flex-wrap",
  dropdown: "relative",
  dropdownButton: "px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 min-w-[140px] justify-between",
  dropdownMenu: "absolute top-full left-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl max-h-60 overflow-y-auto z-[60]",
  dropdownItem: "px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer text-sm text-zinc-700 dark:text-zinc-300 transition-colors",
  filterButton: "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors",
  chevron: "w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-transform",
  chevronOpen: "transform rotate-180",
};

interface Filter {
  label: string;
  value: string;
  options: { label: string; value: string }[];
}

interface StickyFiltersProps {
  filters: Filter[];
  onFilterChange?: (filters: Record<string, string>) => void;
  initialValues?: Record<string, string>;
}

export default function StickyFilters({ filters, onFilterChange, initialValues = {} }: StickyFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>(initialValues);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Update selected filters when initialValues change
  useEffect(() => {
    setSelectedFilters(initialValues);
  }, [initialValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target as Node)
      );
      if (clickedOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterSelect = (filterValue: string, optionValue: string, optionLabel: string) => {
    const newFilters = {
      ...selectedFilters,
      [filterValue]: optionValue,
    };
    setSelectedFilters(newFilters);
    setOpenDropdown(null);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const getSelectedLabel = (filter: Filter) => {
    const selected = selectedFilters[filter.value];
    if (!selected) return filter.label;
    const option = filter.options.find((opt) => opt.value === selected);
    return option?.label || filter.label;
  };

  return (
    <div className={classes.sticky}>
      <div className={classes.container}>
        <div className={classes.filtersRow}>
          {filters.map((filter) => (
            <div
              key={filter.value}
              className={classes.dropdown}
              ref={(el) => {
                dropdownRefs.current[filter.value] = el;
              }}
            >
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === filter.value ? null : filter.value)
                }
                className={classes.dropdownButton}
              >
                <span>{getSelectedLabel(filter)}</span>
                <svg
                  className={`${classes.chevron} ${
                    openDropdown === filter.value ? classes.chevronOpen : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openDropdown === filter.value && (
                <div className={classes.dropdownMenu}>
                  {filter.options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleFilterSelect(filter.value, option.value, option.label)}
                      className={classes.dropdownItem}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className={classes.filterButton}>Filtrai</button>
        </div>
      </div>
    </div>
  );
}
