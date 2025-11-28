"use client";

import { useState, useRef, useEffect } from "react";

const classes = {
  sticky: "sticky top-16 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300",
  container: "w-full px-4 sm:px-6 lg:px-8 py-4",
  header: "flex items-center justify-between mb-4 max-w-7xl mx-auto",
  title: "text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2",
  filterIcon: "w-4 h-4 text-zinc-600 dark:text-zinc-400",
  filtersRow: "flex items-center gap-3 flex-wrap max-w-7xl mx-auto",
  chipDropdown: "relative group",
  chip: "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border flex items-center gap-2 hover:shadow-md",
  chipInactive: "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-accent hover:bg-zinc-50 dark:hover:bg-zinc-800",
  chipActive: "bg-accent text-white border-accent hover:bg-accent-dark",
  chipContent: "flex items-center gap-2",
  clearButton: "ml-1 hover:bg-white/30 dark:hover:bg-black/30 rounded-full p-0.5 transition-all duration-150",
  clearIcon: "w-3 h-3",
  chevron: "w-4 h-4 transition-transform duration-200",
  chevronOpen: "transform rotate-180",
  dropdownMenu: "hidden md:block absolute top-full left-0 mt-2 w-72 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden z-[60]",
  dropdownHeader: "px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700",
  dropdownTitle: "text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide",
  dropdownList: "max-h-80 overflow-y-auto",
  dropdownItem: "px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors duration-150 flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0",
  checkbox: "w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition-colors duration-150",
  checkboxChecked: "bg-accent border-accent",
  checkIcon: "w-3 h-3 text-white",
  badge: "ml-auto px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded",
  // Mobile dialog
  mobileDialog: "md:hidden fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
  mobileDialogContent: "fixed inset-x-0 bottom-0 bg-white dark:bg-zinc-900 rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden transition-transform duration-300",
  mobileDialogHeader: "px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between",
  mobileDialogTitle: "text-base font-semibold text-zinc-900 dark:text-white",
  mobileDialogClose: "p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200",
  mobileDialogList: "overflow-y-auto max-h-[60vh] px-4 py-2",
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
  const [openMobileDialog, setOpenMobileDialog] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | string[]>>(initialValues);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when mobile dialog is open
  useEffect(() => {
    if (openMobileDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openMobileDialog]);

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
        setOpenMobileDialog(null);
      } else {
        newFilters[filterValue] = optionValue;
        setOpenDropdown(null);
        setOpenMobileDialog(null);
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
        <div className={classes.header}>
          <h2 className={classes.title}>
            <svg className={classes.filterIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Providers
          </h2>
        </div>
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
                  onClick={() => {
                    // On mobile, open dialog instead of dropdown
                    if (isMobile) {
                      setOpenMobileDialog(openMobileDialog === filter.value ? null : filter.value);
                      setOpenDropdown(null);
                    } else {
                      setOpenDropdown(isOpen ? null : filter.value);
                      setOpenMobileDialog(null);
                    }
                  }}
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
                    <div className={classes.dropdownHeader}>
                      <div className={classes.dropdownTitle}>
                        {filter.multiSelect ? 'Select Multiple' : 'Select One'} • {filter.options.length} Options
                      </div>
                    </div>
                    <div className={classes.dropdownList}>
                      {filter.options.map((option) => {
                        const isSelected = isOptionSelected(filter.value, option.value, filter.multiSelect || false);

                        return (
                          <div
                            key={option.value}
                            onClick={() => handleOptionClick(filter.value, option.value, filter.multiSelect)}
                            className={`${classes.dropdownItem} group`}
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
                            <span className="flex-1">{option.label}</span>
                            {isSelected && !filter.multiSelect && (
                              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Dialog */}
      {openMobileDialog && (
        <>
          <div
            className={classes.mobileDialog}
            onClick={() => setOpenMobileDialog(null)}
          />
          <div className={classes.mobileDialogContent}>
            <div className={classes.mobileDialogHeader}>
              <h3 className={classes.mobileDialogTitle}>
                {filters.find(f => f.value === openMobileDialog)?.label}
              </h3>
              <button
                onClick={() => setOpenMobileDialog(null)}
                className={classes.mobileDialogClose}
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className={classes.mobileDialogList}>
              {filters.find(f => f.value === openMobileDialog)?.options.map((option) => {
                const filter = filters.find(f => f.value === openMobileDialog);
                if (!filter) return null;
                const isSelected = isOptionSelected(filter.value, option.value, filter.multiSelect || false);

                return (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(filter.value, option.value, filter.multiSelect)}
                    className={`${classes.dropdownItem} group`}
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
                    <span className="flex-1">{option.label}</span>
                    {isSelected && !filter.multiSelect && (
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
