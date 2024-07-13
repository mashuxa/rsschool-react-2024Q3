import { FormEvent, FC, useState, useCallback, useEffect, useRef } from 'react';
import { fetcher } from '../../api/fetcher';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { FetchDataType, Person } from '../../types.ts';

export const SEARCH_STORAGE_KEY = 'search';
const DEFAULT_RESULT = {
  results: [],
  count: 0,
};
interface SearchFormProps {
  setPage: (page: number) => void;
  onSuccess: (data: FetchDataType<Person>) => void;
  page: number;
}

const SearchForm: FC<SearchFormProps> = ({ onSuccess, page, setPage }) => {
  const [initialSearchValue, updateLocalStorage] = useLocalStorage(SEARCH_STORAGE_KEY);
  const [search, setSearch] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(
    async (searchValue: string, page: number) => {
      const searchParams = new URLSearchParams([['page', page.toString()]]);

      if (searchValue) {
        searchParams.set('search', searchValue);
      }

      setIsLoading(true);

      const results = await fetcher<FetchDataType<Person>>(`?${searchParams.toString()}`).catch(() => DEFAULT_RESULT);

      setIsLoading(false);
      onSuccess(results);
    },
    [onSuccess],
  );
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (inputRef.current) {
        setSearch(inputRef.current.value);
        updateLocalStorage(inputRef.current.value);
      }

      setPage(1);
    },
    [setPage, updateLocalStorage],
  );

  useEffect(() => {
    const initial = initialSearchValue.current;

    if (inputRef.current) {
      setSearch(initial);
      inputRef.current.value = initial;
    }
  }, [initialSearchValue]);

  useEffect(() => {
    if (search !== null) {
      void fetchData(search, page);
    }
  }, [fetchData, page, search]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col card space-y-4 p-6 mt-6 rounded-lg shadow-sm bg-white">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
      <div className="flex-row">
        <div className="text-center p-2">{isLoading && 'Loading..'}</div>
      </div>
    </div>
  );
};

export default SearchForm;
