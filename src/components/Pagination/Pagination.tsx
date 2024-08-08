import { useSearchParams } from '@remix-run/react';
import { FC, useEffect, useMemo, useState } from 'react';
import PaginationItem from './PaginationItem/PaginationItem.tsx';

interface PaginationProps {
  count: number;
}

export const DEFAULT_PAGE = '1';
const PER_PAGE = 10;

const Pagination: FC<PaginationProps> = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const pages = useMemo(() => new Array<null>(Math.ceil(count / PER_PAGE)).fill(null), [count]);

  useEffect(() => {
    const page = searchParams.get('page');

    if (page) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  useEffect(() => {
    const page = searchParams.get('page');

    if (!page) {
      setSearchParams({ page: DEFAULT_PAGE });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="text-center p-4">
      {pages.map((_, index) => (
        <PaginationItem
          key={index}
          page={(index + 1).toString()}
          onClick={setCurrentPage}
          isActive={currentPage === (index + 1).toString()}
        />
      ))}
    </div>
  );
};

export default Pagination;
