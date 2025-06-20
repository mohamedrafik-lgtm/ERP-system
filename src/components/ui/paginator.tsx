"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // أو أيقونات SVG بديلة

const Paginator = ({ totalPages = 3 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page:number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4 rounded-md">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-30"
      >
        <ChevronRight />
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
              isActive ? "bg-orange-600 text-white" : ""
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=" disabled:opacity-30"
      >
        <ChevronLeft />
      </button>
    </div>
  );
};

export default Paginator;
