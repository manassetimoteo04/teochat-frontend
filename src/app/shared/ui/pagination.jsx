import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

function buildPages({ page, totalPages, maxButtons }) {
  const pages = [];
  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i += 1) pages.push(i);
    return pages;
  }

  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + maxButtons - 1);
  start = Math.max(1, end - maxButtons + 1);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("ellipsis-left");
  }

  for (let i = start; i <= end; i += 1) pages.push(i);

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("ellipsis-right");
    pages.push(totalPages);
  }

  return pages;
}

function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
  isLoading = false,
  className,
}) {
  const canGoPrev = page > 1 && !isLoading;
  const canGoNext = page < totalPages && !isLoading;
  const pages = buildPages({ page, totalPages, maxButtons: 5 });

  return (
    <div className={clsx("flex justify-end gap-[0.75rem] py-[1rem]", className)}>
      <button
        className={clsx(
          "w-[3rem] h-[3rem] items-center flex bg-gray-100 justify-center rounded-full text-[1.4rem] border border-gray-200",
          !canGoPrev && "opacity-50 cursor-not-allowed",
        )}
        onClick={() => canGoPrev && onPageChange?.(page - 1)}
        aria-disabled={!canGoPrev}
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-[0.5rem]">
        {pages.map((item) =>
          typeof item === "number" ? (
            <button
              key={item}
              onClick={() => onPageChange?.(item)}
              className={clsx(
                "w-[3rem] h-[3rem] text-[1.3rem] flex items-center justify-center rounded-full border",
                item === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-secondary-text-color border-gray-200 hover:text-main-text-color",
              )}
            >
              {item}
            </button>
          ) : (
            <span
              key={item}
              className="w-[3rem] h-[3rem] text-[1.2rem] flex items-center justify-center text-secondary-text-color"
            >
              ...
            </span>
          ),
        )}
      </div>

      <button
        className={clsx(
          "w-[3rem] h-[3rem] items-center flex bg-gray-100 justify-center rounded-full text-[1.4rem] border border-gray-200",
          !canGoNext && "opacity-50 cursor-not-allowed",
        )}
        onClick={() => canGoNext && onPageChange?.(page + 1)}
        aria-disabled={!canGoNext}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default Pagination;
