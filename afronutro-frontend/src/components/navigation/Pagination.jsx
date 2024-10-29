import React, { useState } from 'react';
import { Pagination } from 'flowbite-react';

const PaginatedComponent = ({ totalPages, currentPage, onPageChange }) => {
  const [page, setPage] = useState(currentPage || 1);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
    onPageChange(selectedPage); // Call the parent's callback
  };

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedComponent;
