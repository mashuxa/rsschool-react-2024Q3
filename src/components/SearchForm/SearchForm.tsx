import { useSearchParams } from '@remix-run/react';
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useLocalStorage from 'src/hooks/useLocalStorage/useLocalStorage.ts';
import { clearSelected } from 'src/store/personsSlice/personsSlice.ts';
import { DEFAULT_PAGE } from '../Pagination/Pagination.tsx';

export const SEARCH_STORAGE_KEY = 'search';

const SearchForm: FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({ page: DEFAULT_PAGE });
  const [search, setSearch] = useState<string | null>(null);
  const updateLocalStorage = useLocalStorage(SEARCH_STORAGE_KEY, setSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (inputRef.current) {
        updateLocalStorage(inputRef.current.value);
        setSearch(inputRef.current.value);
        dispatch(clearSelected());
      }
    },
    [dispatch, updateLocalStorage],
  );

  useEffect(() => {
    if (search !== null) {
      setSearchParams((prev) => ({ ...prev, page: searchParams.get('page') || DEFAULT_PAGE, search }));
    }
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    const querySearch = searchParams.get('search') || '';

    setSearch(querySearch);
    updateLocalStorage(querySearch);
  }, [updateLocalStorage, searchParams]);

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
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-800"
        />
        <button
          data-testid="search-form-submit"
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
