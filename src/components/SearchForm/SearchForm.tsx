import { FormEvent, FC, useState, useCallback, useRef, useMemo } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage.ts';
import Preloader from '../Preloader/Preloader.tsx';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../Pagination/Pagination.tsx';
import api from '../../api/api.ts';

export const SEARCH_STORAGE_KEY = 'search';

const SearchForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: DEFAULT_PAGE });
  const [search, setSearch] = useState<string | null>(null);
  const updateLocalStorage = useLocalStorage(SEARCH_STORAGE_KEY, setSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParam = useMemo(() => (search ? `&search=${search}` : ''), [search]);
  const { isLoading } = api.useGetPersonsQuery(`?${searchParams.toString()}${searchParam}`);

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

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col card space-y-4 p-6 rounded-lg shadow-sm bg-white dark:bg-gray-600 dark:text-slate-50"
      >
        <input
          data-testid="search-form-input"
          defaultValue={search || ''}
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          data-testid="search-form-submit"
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
