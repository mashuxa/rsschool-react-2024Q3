import { FC, useMemo } from 'react';
import PaginationItem from './PaginationItem/PaginationItem.tsx';

export interface PaginationProps {
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PER_PAGE = 10;

const Pagination: FC<PaginationProps> = ({ totalCount, currentPage, setCurrentPage }) => {
  const pages = useMemo(() => new Array<null>(Math.ceil(totalCount / PER_PAGE)).fill(null), [totalCount]);

  return (
    <div className="text-center">
      {pages.map((_, index) => (
        <PaginationItem key={index} page={index + 1} onClick={setCurrentPage} isActive={currentPage === index + 1} />
      ))}
    </div>
  );
};

export default Pagination;
