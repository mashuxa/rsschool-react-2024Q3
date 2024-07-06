import { Component, FormEvent, ChangeEvent } from 'react';

import { fetcher } from '../../api/fetcher';
import { Film } from '../../types';

export const SEARCH_STORAGE_KEY = 'search';
interface SearchFormProps {
  onSuccess: (films: Film[]) => void;
}

interface SearchFormState {
  search: string;
  isLoading: boolean;
}
interface FetchDataType {
  results: Film[];
}

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);

    this.state = {
      search: localStorage.getItem(SEARCH_STORAGE_KEY) || '',
      isLoading: false,
    };
  }

  fetchData = async () => {
    const searchParams = new URLSearchParams([['page', '1']]);

    if (this.state.search) {
      searchParams.set('search', this.state.search);
    }

    this.setState<'isLoading'>({ isLoading: true });

    const { results } = await fetcher<FetchDataType>(`?${searchParams.toString()}`).catch(() => ({
      results: [],
    }));

    this.setState<'isLoading'>({ isLoading: false });
    this.props.onSuccess(results);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState<'search'>({ search: event.target.value.trim() });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    localStorage.setItem(SEARCH_STORAGE_KEY, this.state.search);
    void this.fetchData();
  };

  componentDidMount() {
    void this.fetchData();
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="flex flex-col card space-y-4 p-6 mt-6 rounded-lg shadow-sm bg-white"
        >
          <input
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={this.state.isLoading}
          >
            Submit
          </button>
        </form>
        <div className="text-center p-2">{this.state.isLoading && 'Loading..'}</div>
      </div>
    );
  }
}

export default SearchForm;
