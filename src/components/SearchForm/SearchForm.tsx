import { FormEvent, FC, useState, useCallback, useEffect, useRef } from 'react';
import { fetcher } from '../../api/fetcher';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { FetchDataType, Person } from '../../types.ts';
import Preloader from '../Preloader/Preloader.tsx';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../Pagination/Pagination.tsx';

export const SEARCH_STORAGE_KEY = 'search';
const DEFAULT_RESULT = {
  results: [],
  count: 0,
};
interface SearchFormProps {
  onSuccess: (data: FetchDataType<Person>) => void;
}

const SearchForm: FC<SearchFormProps> = ({ onSuccess }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string | null>(null);
  const updateLocalStorage = useLocalStorage(SEARCH_STORAGE_KEY, setSearch);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(
    async (searchValue: string, page: string) => {
      const searchParams = new URLSearchParams([['page', page]]);

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
        updateLocalStorage(inputRef.current.value);
        setSearchParams({ page: DEFAULT_PAGE });
        setSearch(inputRef.current.value);
      }
    },
    [setSearchParams, updateLocalStorage],
  );

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams((prev) => `${prev.toString()}&page=${DEFAULT_PAGE}`);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (search !== null) {
      void fetchData(search, searchParams.get('page') || DEFAULT_PAGE);
    }
  }, [fetchData, search, searchParams]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col card space-y-4 p-6 rounded-lg shadow-sm bg-white">
        <input
          defaultValue={search || ''}
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
        <div className="text-center p-2">{isLoading && <Preloader />}</div>
      </div>
    </div>
  );
};

export default SearchForm;
