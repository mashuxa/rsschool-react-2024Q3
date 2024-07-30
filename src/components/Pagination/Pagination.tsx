import { FC, useContext, useEffect, useMemo, useState } from "react";
import PaginationItem from "src/components/Pagination/PaginationItem/PaginationItem";
import { useRouter } from "next/router";
import { DataContext } from "src/providers/DataProvider/DataProvider";

export const DEFAULT_PAGE = "1";
const PER_PAGE = 10;

const Pagination: FC = () => {
  const { persons } = useContext(DataContext);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const pages = useMemo(
    () => new Array<null>(Math.ceil(persons.count / PER_PAGE)).fill(null),
    [persons.count],
  );

  useEffect(() => {
    const page = router.query.page as string;

    if (page) {
      setCurrentPage(page);
    }
  }, [router.query.page]);

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
