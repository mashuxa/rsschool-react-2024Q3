import { FC, useCallback } from "react";
import { useRouter } from "next/router";

interface PaginationItemProps {
  page: string;
  onClick: (page: string) => void;
  isActive: boolean;
}

const PaginationItem: FC<PaginationItemProps> = ({ page, isActive }) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    void router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
  }, [page, router]);

  return (
    <button
      className={`px-3 py-1 mr-2 rounded-md text-lg font-medium transition-colors duration-200 ${
        isActive ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
      } hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
      type="button"
      onClick={handleClick}
    >
      {page}
    </button>
  );
};

export default PaginationItem;
