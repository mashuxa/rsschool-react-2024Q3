import { FC, useEffect, useMemo, useState } from 'react';
import PaginationItem from './PaginationItem/PaginationItem.tsx';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

export const DEFAULT_PAGE = '1';
const PER_PAGE = 10;

const Pagination: FC = () => {
  const { count } = useSelector((state: RootState) => state.persons.currentPage);
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
