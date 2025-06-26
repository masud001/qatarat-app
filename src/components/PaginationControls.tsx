import React from "react";

interface PaginationControlsProps {
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, setPage, totalPages }) => (
  <div className="flex gap-2 justify-center items-center mt-6">
    <button
      className="px-3 py-1 cursor-pointer rounded bg-(--theme-background-color) disabled:opacity-50"
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
    >
      Prev
    </button>
    <span className="px-2">Page {page} of {totalPages}</span>
    <button
      className="px-3 py-1 cursor-pointer rounded bg-(--theme-background-color) disabled:opacity-50 disabled:cursor-default"
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
);

export default PaginationControls;