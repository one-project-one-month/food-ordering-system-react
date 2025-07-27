import React from 'react';
import { Button } from './button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className={`flex items-center gap-2 ${className || ''}`} aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo;
      </Button>
      {pages.map(page => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &raquo;
      </Button>
    </nav>
  );
};

export default Pagination;
