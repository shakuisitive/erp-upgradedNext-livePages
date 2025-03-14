"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

export const useHookState = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
};

export const useHookDispatch = () => {
  const dispatch = useDispatch();
  return { dispatch };
};
