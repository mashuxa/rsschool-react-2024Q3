import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import * as router from 'react-router-dom';
import { act } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../../store/store.ts';
import mockData from '../../__mocks__/persons.ts';

describe('Pagination Component', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useSearchParams: jest.fn(),
  }));
  const useSearchParamsSpy: jest.SpyInstance = jest.spyOn(router, 'useSearchParams');
  const mockStore = createStore({
    persons: {
      currentPage: { results: mockData, count: 20 },
      selectedPersons: {},
    },
  });

  it('should updates URL query parameter when page changes', async () => {
    const setParams = jest.fn();

    useSearchParamsSpy.mockReturnValue([new URLSearchParams(), setParams]);

    const { getByText } = render(
      <Provider store={mockStore}>
        <Pagination />
      </Provider>,
    );
    const page2Button = getByText('2');

    await act(async () => {
      fireEvent.click(page2Button);
    });

    expect(setParams).toHaveBeenCalledWith({ page: '2' });
  });
});
