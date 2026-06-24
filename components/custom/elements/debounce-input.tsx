"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface DebounceInputProps {
  value?: string;
  delay?: number;
  placeholder?: string;
  onDebouncedChange: (value: string) => void;
}

export function DebounceInput({
  value = "",
  delay = 500,
  placeholder,
  onDebouncedChange,
}: DebounceInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onDebouncedChange(inputValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue, delay, onDebouncedChange]);

  return (
    <Input
      type="text"
      value={inputValue}
      placeholder={placeholder}
      onChange={(e) => setInputValue(e.target.value)}
      className="border rounded px-3 py-2 w-full"
    />
  );
}
