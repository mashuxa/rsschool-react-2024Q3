import { useSearchParams } from '@remix-run/react';
import { fireEvent } from '@testing-library/react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { renderWithRemix } from 'src/__mocks__/renderWithRemix.tsx';
import { createStore } from 'src/store/store.ts';
import Pagination from './Pagination';

jest.mock('@remix-run/react', () => ({
  ...jest.requireActual('@remix-run/react'),
  useSearchParams: jest.fn(),
}));

describe('Pagination Component', () => {
  const setSearchParamsMock = jest.fn();
  const mockStore = createStore({
    persons: {
      selectedPersons: {},
    },
  });

  (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams({}), setSearchParamsMock]);

  it('should updates URL query parameter when page changes', async () => {
    const { getByText } = renderWithRemix(
      <Provider store={mockStore}>
        <Pagination count={82} />
      </Provider>,
    );
    const page2Button = getByText('2');

    await act(async () => {
      fireEvent.click(page2Button);
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '2' });
  });
});
