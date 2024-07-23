import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchForm from './SearchForm';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/api.ts';
import { DEFAULT_PAGE } from '../Pagination/Pagination.tsx';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage.ts';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));
jest.mock('../../hooks/useLocalStorage/useLocalStorage.ts');
jest.mock('../../api/api.ts', () => ({
  useGetPersonsQuery: jest.fn(),
}));

describe('SearchForm', () => {
  const updateLocalStorageMock = jest.fn();
  const setSearchParamsMock = jest.fn();
  const useGetPersonsQueryMock = api.useGetPersonsQuery as jest.Mock;

  (useLocalStorage as jest.Mock).mockReturnValue(updateLocalStorageMock);
  (useSearchParams as jest.Mock).mockReturnValue([{}, setSearchParamsMock]);

  it('should call updateLocalStorage callback and setSearchParams on form submit', async () => {
    useGetPersonsQueryMock.mockImplementation(() => ({ isLoading: false }));
    render(<SearchForm />);

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
    useGetPersonsQueryMock.mockImplementation(() => ({ isLoading: true }));
    render(<SearchForm />);

    const preloader = screen.getByTestId('preloader');

    expect(preloader).toBeInTheDocument();
  });
});
