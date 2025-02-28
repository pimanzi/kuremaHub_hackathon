import { useSearchParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function SortComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Sort by');
  const dropdownRef = useRef(null);

  function handleOptionSelect(value, label) {
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
    setSelectedOption(label);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex lg:justify-end pr-3">
      <div className="relative w-52" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:ring-white focus-visible:outline-none w-full bg-[#2C3E50] text-[#E9ECEF] focus:border-transparent focus:ring px-4 py-2 rounded-md flex items-center justify-between"
        >
          <span>{selectedOption}</span>
          <svg
            className={`ml-2 w-4 h-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute mt-1 w-full bg-[#2C3E50] rounded-md shadow-lg z-10">
            <div className="py-1">
              <button
                className="w-full text-left px-4 py-2 text-[#E9ECEF] hover:bg-[#495057]"
                onClick={() => handleOptionSelect('date-asc', 'Oldest First')}
              >
                Oldest First
              </button>
              <button
                className="w-full text-left px-4 py-2 text-[#E9ECEF] hover:bg-[#495057]"
                onClick={() => handleOptionSelect('date-desc', 'Newest First')}
              >
                Newest First
              </button>
              <button
                className="w-full text-left px-4 py-2 text-[#E9ECEF] hover:bg-[#495057]"
                onClick={() =>
                  handleOptionSelect('price-asc', 'Price: Low to High')
                }
              >
                Price: Low to High
              </button>
              <button
                className="w-full text-left px-4 py-2 text-[#E9ECEF] hover:bg-[#495057]"
                onClick={() =>
                  handleOptionSelect('price-desc', 'Price: High to Low')
                }
              >
                Price: High to Low
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
