import React from "react";

export default function BrandLoader({
  message = "Loading authentic gemstone details...",
  minHeight = "60vh",
}) {
  return (
    <div
      style={{ minHeight }}
      className="w-full flex flex-col items-center justify-center p-6 select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Soft Sacred Amber/Gold Glow Aura */}
        <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-400/25 to-amber-200/20 blur-xl animate-pulse" />

        {/* Outer Elegant Spinning Gold Ring */}
        <div
          className="w-20 h-20 rounded-full border-2 border-amber-200 border-t-amber-700 border-r-amber-500 animate-spin"
          style={{ animationDuration: "1.2s" }}
        />

        {/* Inner Counter-spinning Accent Ring */}
        <div
          className="absolute w-16 h-16 rounded-full border border-dashed border-amber-400/50 animate-spin"
          style={{ animationDuration: "3s", animationDirection: "reverse" }}
        />

        {/* Center Logo Icon with gentle breathing pulse */}
        <div className="absolute flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md p-1.5 border border-amber-100">
          <img
            src="/logo.png"
            alt="Crystal Jaipuria"
            className="w-full h-full object-contain animate-pulse"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>

      {/* Brand Name & Tagline */}
      <div className="mt-5 text-center flex flex-col items-center">
        <span className="text-[11px] font-bold tracking-[0.25em] text-gray-800 uppercase">
          Crystal Jaipuria
        </span>
        <span className="text-[9px] font-medium tracking-[0.15em] text-amber-700/80 uppercase mt-0.5">
          Jaipur Heritage Since 1989
        </span>
        <p className="text-xs text-gray-500 font-medium mt-2 flex items-center gap-1">
          <span>{message}</span>
          <span className="inline-flex gap-0.5 ml-1">
            <span
              className="w-1 h-1 bg-amber-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1 h-1 bg-amber-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1 h-1 bg-amber-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </span>
        </p>
      </div>
    </div>
  );
}
