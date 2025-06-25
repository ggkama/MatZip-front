const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageLimit = 10;
  const currentPageGroup = Math.floor(currentPage / pageLimit);
  const startPage = currentPageGroup * pageLimit;
  const endPage = Math.min(startPage + pageLimit, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {currentPageGroup > 0 && (
        <button
          onClick={() => onPageChange(startPage - 1)}
          className="px-3 py-1 rounded bg-gray-200"
        >
          &hellip;
        </button>
      )}

      {currentPage !== 0 && (
        <button
          onClick={() => onPageChange((p) => Math.max(p - 1, 0))}
          className="px-3 py-1 rounded bg-gray-200"
        >
          이전
        </button>
      )}

      {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map(
        (n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`px-3 py-1 rounded ${
              n === currentPage ? "bg-lime-400 text-white" : "bg-gray-200"
            }`}
          >
            {n + 1}
          </button>
        )
      )}

      {currentPage !== totalPages - 1 && (
        <button
          onClick={() => onPageChange((p) => Math.min(p + 1, totalPages - 1))}
          className="px-3 py-1 rounded bg-gray-200"
        >
          다음
        </button>
      )}

      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(endPage)}
          className="px-3 py-1 rounded bg-gray-200"
        >
          &hellip;
        </button>
      )}
    </div>
  );
};

export default Pagination;
