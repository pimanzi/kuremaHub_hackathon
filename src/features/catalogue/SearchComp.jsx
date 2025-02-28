// src/components/SearchComp.jsx
import { useState } from 'react';
import Card from './Card';
import { CiSearch } from 'react-icons/ci';
import { useArts } from '@/features/arts/useArts';
import Pagination from '../../components/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FilterComponent from './FilterComponent';
import SortComponent from './SortComponent';

const SearchComp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const sortOption = searchParams.get('sortBy') || 'date-asc';

  const { isLoading, arts } = useArts();
  const itemsPerPage = 12; // Number of cards per page
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );

  const filteredArts =
    category === 'all'
      ? arts
      : arts?.filter((art) => art.category === category);

  const field = sortOption.split('-')[0];
  const value = sortOption.split('-')[1];

  const modifier = value === 'asc' ? 1 : -1;
  const fieldColumn = field === 'price' ? 'price' : 'created_at';

  const sortedArts = filteredArts?.sort((a, b) => {
    if (fieldColumn === 'created_at') {
      return (
        (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) *
        modifier
      );
    }

    // Sort by price
    return (a.price - b.price) * modifier;
  });
  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedArts?.length / itemsPerPage);

  // Get the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArts = sortedArts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getVisiblePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 3) pages.push(1, 'ellipsis');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push('ellipsis', totalPages);
    }
    return pages;
  };

  return (
    <>
      {' '}
      <div className="mb-8">
        <div className="flex items-center gap-2 border border-black p-2 rounded-full mb-4 w-full max-w-[400px]">
          <input
            type="text"
            name="searchbar"
            id="searchbar"
            className="w-full outline-none"
            placeholder="Search artwork..."
          />
          <CiSearch className="text-xl" />
        </div>

        {/* filter */}
        <div className="lg:flex justify-between items-center block space-y-5 lg:space-y-0">
          <FilterComponent></FilterComponent>

          <SortComponent></SortComponent>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentArts.map((art) => (
          <Card art={art} key={art.id} id={art.id} />
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePageNumbers={getVisiblePageNumbers()}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default SearchComp;
