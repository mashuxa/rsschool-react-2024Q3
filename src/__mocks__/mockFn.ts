import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export const mockUseParams = (id: string) => {
  (useParams as jest.Mock).mockReturnValue({ id });
};

export const mockUseRouter = () => {
  const push = jest.fn();

  (useRouter as jest.Mock).mockReturnValue({ push });

  return push;
};

export const mockUsePathname = (pathname = "") => {
  (usePathname as jest.Mock).mockReturnValue(pathname);
};

export const mockUseSearchParams = (page: string, search = "") => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get(key: string) {
      switch (key) {
        case "page":
          return page;
        case "search":
          return search;
        default:
          return "";
      }
    },
    toString() {
      return `page=${page}&search=${search}`;
    },
  });
};
