import React from "react";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <div className="fixed z-50 text-white bottom-4 right-4 flex items-center gap-2 bg-black pt-2 pb-2 pl-3 pr-3 rounded-md shadow-lg cursor-pointer transition-all hover:shadow-xl border border-neutral-800">
      <Coffee className="w-5 h-5" />
      <span className="whitespace-nowrap text-xs">
        <div className="flex items-center gap-1.5 align-middle justify-center text-sm">
          <span>Edit with </span>
          <span className="mb-0.5">BrewLog</span>
        </div>
      </span>
      <Button 
        variant="ghost" 
        size="sm" 
        className="p-0.5 ml-0.5 rounded-full hover:bg-neutral-700 transition-colors"
        aria-label="Close badge"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </Button>
    </div>
  );
} 