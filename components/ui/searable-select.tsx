"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

interface SearchableSelectProps {
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

export function SearchableSelect({
  options,
  placeholder = "Select option",
  onSelect,
  disabled,
  hasError = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setSearchTerm("");
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div ref={containerRef} className="w-full">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "text-m w-full border-2 px-3 py-2 leading-5 font-normal shadow-none",
          isOpen && !hasError && "border-primary",
          hasError && "border-destructive",
        )}
        disabled={disabled}
      >
        <input
          type="text"
          placeholder={selectedValue || placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="text-foreground placeholder-muted-foreground flex-1 bg-transparent outline-none"
        />
        <ChevronDown
          size={20}
          className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="border-border absolute z-50 mt-2 w-full max-w-2xl rounded-lg border bg-white shadow-lg">
          <div className="max-h-96 overflow-y-auto py-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="text-s hover:bg-neutral-20 w-full px-4 py-2 text-start font-bold transition-colors"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="text-muted-foreground px-4 py-3">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
