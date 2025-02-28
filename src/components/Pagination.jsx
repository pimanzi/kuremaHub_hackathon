import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  visiblePageNumbers,
  onPageChange,
  className,
}) => {
  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      {/* Previous button */}
      <button
        className={`h-11 w-11 flex items-center justify-center rounded-full border-none bg-[#2C3E50] text-[#E9ECEF] hover:bg-[#495057] hover:text-white transition-all duration-300 ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous page</span>
      </button>

      {/* Page numbers */}
      <div className="flex items-center space-x-3">
        {visiblePageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <div
                key={`ellipsis-${index}`}
                className="flex items-center justify-center h-11 w-11"
              >
                <MoreHorizontal className="h-6 w-6 text-[#495057]" />
              </div>
            );
          }

          return (
            <button
              key={page}
              className={`h-11 w-11 flex items-center justify-center text-lg font-semibold rounded-full border-none transition-all duration-300 transform hover:scale-110 ${
                currentPage === page
                  ? 'bg-[#2C3E50] text-[#FFFFFF] shadow-lg'
                  : 'bg-[#E9ECEF] text-[#2C3E50] hover:bg-[#495057] hover:text-[#FFFFFF]'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
              <span className="sr-only">Page {page}</span>
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        className={`h-11 w-11 flex items-center justify-center rounded-full border-none bg-[#2C3E50] text-[#E9ECEF] hover:bg-[#495057] hover:text-white transition-all duration-300 ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next page</span>
      </button>
    </div>
  );
};

export default Pagination;
