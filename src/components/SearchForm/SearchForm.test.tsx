import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchForm from './SearchForm';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../Pagination/Pagination.tsx';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { createStore, store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import mockData from '../../__mocks__/persons.ts';
import api from '../../api/api.ts';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));
jest.mock('../../hooks/useLocalStorage/useLocalStorage.ts');

describe('SearchForm', () => {
  const updateLocalStorageMock = jest.fn();
  const setSearchParamsMock = jest.fn();
  const useGetPersonsSpy: jest.SpyInstance = jest.spyOn(api, 'useGetPersonsQuery');

  (useLocalStorage as jest.Mock).mockReturnValue(updateLocalStorageMock);
  (useSearchParams as jest.Mock).mockReturnValue([{}, setSearchParamsMock]);

  it('should call updateLocalStorage callback and setSearchParams on form submit', async () => {
    useGetPersonsSpy.mockReturnValue({ data: { results: mockData, count: 3 } });

    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>,
    );

    const input = screen.getByTestId('search-form-input');
    const button = screen.getByTestId('search-form-submit');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.click(button);
    });

    expect(updateLocalStorageMock).toHaveBeenCalledWith('test');
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: DEFAULT_PAGE });
  });

  it('should show preloader on fetch', async () => {
    const mockStore = createStore({ persons: { currentPage: { isLoading: true } } });

    render(
      <Provider store={mockStore}>
        <SearchForm />
      </Provider>,
    );

    expect(await screen.findByTestId('preloader')).toBeInTheDocument();
  });
});
