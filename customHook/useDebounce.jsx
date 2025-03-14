"use client";
import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncevalue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncevalue;
};

export default useDebounce;
