import { FormEvent, FC, useState, useCallback, useRef, useMemo, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage.ts';
import Preloader from '../Preloader/Preloader.tsx';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../Pagination/Pagination.tsx';
import api from '../../api/api.ts';
import { clearSelected, updateCurrentPageData } from '../../store/personsSlice/personsSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

export const SEARCH_STORAGE_KEY = 'search';

const SearchForm: FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.persons.currentPage);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({ page: DEFAULT_PAGE });
  const [search, setSearch] = useState<string | null>(null);
  const updateLocalStorage = useLocalStorage(SEARCH_STORAGE_KEY, setSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParam = useMemo(() => (search ? `&search=${search}` : ''), [search]);
  const { data } = api.useGetPersonsQuery(`?${searchParams.toString()}${searchParam}`);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (inputRef.current) {
        updateLocalStorage(inputRef.current.value);
        setSearchParams({ page: DEFAULT_PAGE });
        setSearch(inputRef.current.value);
        dispatch(clearSelected());
      }
    },
    [dispatch, setSearchParams, updateLocalStorage],
  );

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentPageData(data));
    }
  }, [data, dispatch]);

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
