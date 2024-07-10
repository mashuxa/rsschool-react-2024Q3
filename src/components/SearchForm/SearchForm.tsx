import { FormEvent, ChangeEvent, FC, useState, useCallback, useEffect } from 'react';
import { fetcher } from '../../api/fetcher';
import { Film } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage.ts';

export const SEARCH_STORAGE_KEY = 'search';
interface SearchFormProps {
  onSuccess: (films: Film[]) => void;
}

interface FetchDataType {
  results: Film[];
}
const SearchForm: FC<SearchFormProps> = ({ onSuccess }) => {
  const [initialSearchValue, updateLocalStorage] = useLocalStorage(SEARCH_STORAGE_KEY);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (searchValue: string) => {
      const searchParams = new URLSearchParams([['page', '1']]);

      if (searchValue) {
        searchParams.set('search', searchValue);
      }

      setIsLoading(true);

      const { results } = await fetcher<FetchDataType>(`?${searchParams.toString()}`).catch(() => ({ results: [] }));

      setIsLoading(false);
      onSuccess(results);
    },
    [onSuccess],
  );
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      updateLocalStorage(search);
      void fetchData(search);
    },
    [fetchData, search, updateLocalStorage],
  );
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value.trim());
    },
    [setSearch],
  );

  useEffect(() => {
    const initial = initialSearchValue.current as string;

    setSearch(initial);
    void fetchData(initial);
  }, [fetchData, initialSearchValue]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col card space-y-4 p-6 mt-6 rounded-lg shadow-sm bg-white">
        <input
          type="text"
          value={search}
          onChange={handleChange}
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
      <div className="text-center p-2">{isLoading && 'Loading..'}</div>
    </div>
  );
};

export default SearchForm;
