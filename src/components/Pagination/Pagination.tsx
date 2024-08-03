"use client";

import { FC, useEffect, useMemo, useState } from "react";
import PaginationItem from "src/components/Pagination/PaginationItem/PaginationItem";
import { useSearchParams } from "next/navigation";
import { DEFAULT_PAGE } from "src/api/constatnts";

interface PaginationProps {
  count: number;
}

const PER_PAGE = 10;

const Pagination: FC<PaginationProps> = ({ count }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    () => searchParams.get("page") || DEFAULT_PAGE,
  );

  const pages = useMemo(
    () => new Array<null>(Math.ceil(count / PER_PAGE)).fill(null),
    [count],
  );

  useEffect(() => {
    const page = searchParams.get("page");

    if (page) {
      setCurrentPage(page);
    }
  }, [searchParams]);

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
