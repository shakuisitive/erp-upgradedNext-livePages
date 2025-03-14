"use client";
import React from "react";
import Header from "./_components/header/Header";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex-1 flex flex-col ">
      <Header />

      {children}
    </div>
  );
}
