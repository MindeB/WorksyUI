"use client";

import { useState, useRef, useEffect } from "react";

const classes = {
  sticky: "sticky top-16 z-40 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",
  filtersRow: "flex items-center gap-3 flex-wrap",
  chipDropdown: "relative",
  chip: "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border flex items-center gap-2",
  chipInactive: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700",
  chipActive: "bg-blue-600 text-white border-blue-600 hover:bg-blue-700",
  chipContent: "flex items-center gap-2",
  clearButton: "ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors",
  clearIcon: "w-3.5 h-3.5",
  chevron: "w-4 h-4 transition-transform",
  chevronOpen: "transform rotate-180",
  dropdownMenu: "absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl max-h-80 overflow-y-auto z-[60]",
  dropdownItem: "px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer text-sm text-zinc-700 dark:text-zinc-300 transition-colors flex items-center gap-2",
  checkbox: "w-4 h-4 rounded border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center transition-colors",
  checkboxChecked: "bg-blue-600 border-blue-600",
  checkIcon: "w-3 h-3 text-white",
};

interface FilterOption {
  label: string;
  value: string;
}

interface Filter {
  label: string;
  value: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

interface ChipDropdownFiltersProps {
  filters: Filter[];
  onFilterChange?: (filters: Record<string, string | string[]>) => void;
  initialValues?: Record<string, string | string[]>;
}

export default function ChipDropdownFilters({ filters, onFilterChange, initialValues = {} }: ChipDropdownFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | string[]>>(initialValues);
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

  const handleOptionClick = (filterValue: string, optionValue: string, multiSelect: boolean = false) => {
    let newFilters = { ...selectedFilters };

    if (multiSelect) {
      // Multi-select logic
      const currentValues = (newFilters[filterValue] as string[]) || [];
      if (currentValues.includes(optionValue)) {
        // Remove if already selected
        const updated = currentValues.filter((v) => v !== optionValue);
        if (updated.length === 0) {
          delete newFilters[filterValue];
        } else {
          newFilters[filterValue] = updated;
        }
      } else {
        // Add to selection
        newFilters[filterValue] = [...currentValues, optionValue];
      }
    } else {
      // Single select logic
      if (newFilters[filterValue] === optionValue) {
        // Deselect if clicking the same option
        delete newFilters[filterValue];
        setOpenDropdown(null);
      } else {
        newFilters[filterValue] = optionValue;
        setOpenDropdown(null);
      }
    }

    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilter = (filterValue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFilters = { ...selectedFilters };
    delete newFilters[filterValue];
    setSelectedFilters(newFilters);
    setOpenDropdown(null);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const getChipLabel = (filter: Filter): string => {
    const selected = selectedFilters[filter.value];

    if (!selected) {
      return filter.label;
    }

    if (Array.isArray(selected)) {
      // Multi-select
      if (selected.length === 0) {
        return filter.label;
      }
      const firstOption = filter.options.find((opt) => opt.value === selected[0]);
      if (selected.length > 1) {
        return `${firstOption?.label || selected[0]} +${selected.length - 1}`;
      }
      return firstOption?.label || selected[0];
    } else {
      // Single select
      const option = filter.options.find((opt) => opt.value === selected);
      return option?.label || filter.label;
    }
  };

  const isOptionSelected = (filterValue: string, optionValue: string, multiSelect: boolean): boolean => {
    const selected = selectedFilters[filterValue];
    if (!selected) return false;

    if (multiSelect && Array.isArray(selected)) {
      return selected.includes(optionValue);
    }
    return selected === optionValue;
  };

  const hasSelection = (filterValue: string): boolean => {
    const selected = selectedFilters[filterValue];
    if (!selected) return false;
    if (Array.isArray(selected)) return selected.length > 0;
    return true;
  };

  return (
    <div className={classes.sticky}>
      <div className={classes.container}>
        <div className={classes.filtersRow}>
          {filters.map((filter) => {
            const isActive = hasSelection(filter.value);
            const isOpen = openDropdown === filter.value;

            return (
              <div
                key={filter.value}
                className={classes.chipDropdown}
                ref={(el) => {
                  dropdownRefs.current[filter.value] = el;
                }}
              >
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : filter.value)}
                  className={`${classes.chip} ${isActive ? classes.chipActive : classes.chipInactive}`}
                >
                  <span className={classes.chipContent}>
                    {getChipLabel(filter)}
                    {isActive && (
                      <span
                        onClick={(e) => clearFilter(filter.value, e)}
                        className={classes.clearButton}
                        role="button"
                        aria-label="Clear filter"
                      >
                        <svg
                          className={classes.clearIcon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                  <svg
                    className={`${classes.chevron} ${isOpen ? classes.chevronOpen : ""}`}
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

                {isOpen && (
                  <div className={classes.dropdownMenu}>
                    {filter.options.map((option) => {
                      const isSelected = isOptionSelected(filter.value, option.value, filter.multiSelect || false);

                      return (
                        <div
                          key={option.value}
                          onClick={() => handleOptionClick(filter.value, option.value, filter.multiSelect)}
                          className={classes.dropdownItem}
                        >
                          {filter.multiSelect && (
                            <div className={`${classes.checkbox} ${isSelected ? classes.checkboxChecked : ""}`}>
                              {isSelected && (
                                <svg
                                  className={classes.checkIcon}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          )}
                          <span>{option.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
