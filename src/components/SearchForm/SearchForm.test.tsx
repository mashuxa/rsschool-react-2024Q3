import { useSearchParams } from '@remix-run/react';
import { act, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { renderWithRemix } from 'src/__mocks__/renderWithRemix.tsx';
import useLocalStorage from 'src/hooks/useLocalStorage/useLocalStorage.ts';
import { store } from 'src/store/store.ts';
import SearchForm from './SearchForm';

jest.mock('@remix-run/react', () => ({
  ...jest.requireActual('@remix-run/react'),
  useSearchParams: jest.fn(),
}));
jest.mock('src/hooks/useLocalStorage/useLocalStorage.ts');

describe('SearchForm', () => {
  const updateLocalStorageMock = jest.fn();
  const setSearchParamsMock = jest.fn();

  (useLocalStorage as jest.Mock).mockReturnValue(updateLocalStorageMock);
  (useSearchParams as jest.Mock).mockReturnValue([
    new URLSearchParams({ page: '1', search: '123' }),
    setSearchParamsMock,
  ]);

  it('should call updateLocalStorage callback and setSearchParams on form submit', async () => {
    renderWithRemix(
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

    const mockCalls = setSearchParamsMock.mock.calls as [[jest.Mock], [jest.Mock]];
    const updateFunction = mockCalls[1][0];
    const newParams = updateFunction({});

    expect(newParams).toEqual({ page: '1', search: 'test' });

    expect(updateLocalStorageMock).toHaveBeenCalledWith('test');
  });
});
