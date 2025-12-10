import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeId, onSelect }) => {
  return (
    <div className="flex items-center gap-4 my-6 md:my-8">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 md:gap-3 mask-linear-gradient pb-2 md:pb-0 px-1">
        {categories.map((cat) => {
           const activeStyle = cat.id === activeId 
             ? "bg-white text-black font-semibold shadow-lg shadow-white/5 scale-105" 
             : "bg-[#1a1c22] text-gray-400 hover:text-white border border-transparent hover:border-white/10";
             
           return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${activeStyle}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Navigation Arrows (Desktop Only) */}
      <div className="hidden md:flex items-center gap-2">
         <button className="p-2.5 rounded-full bg-[#1a1c22] text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronLeft size={16} />
         </button>
         <button className="p-2.5 rounded-full bg-[#1a1c22] text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronRight size={16} />
         </button>
      </div>
    </div>
  );
};

export default CategoryTabs;