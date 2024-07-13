import { FC, useCallback } from 'react';

interface PaginationItemProps {
  page: number;
  onClick: (page: number) => void;
  isActive: boolean;
}

const PaginationItem: FC<PaginationItemProps> = ({ page, onClick, isActive }) => {
  const handleClick = useCallback(() => {
    onClick(page);
  }, [onClick, page]);

  return (
    <button
      className={`px-3 py-1 mr-2 rounded-md text-lg font-medium transition-colors duration-200 ${
        isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'
      } hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
      type="button"
      onClick={handleClick}
    >
      {page}
    </button>
  );
};

export default PaginationItem;
