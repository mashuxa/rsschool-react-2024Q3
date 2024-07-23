import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SelectionMenu from './SelectionMenu.tsx';
import mockData from '../../__mocks__/persons.ts';
import { createStore } from '../../store/store.ts';
import { act } from 'react';

describe('SelectionMenu', () => {
  const mockStore = createStore({ persons: { selectedPersons: { '1': mockData[0], '2': mockData[1] } } });
  const dispatchMock = jest.fn();

  mockStore.dispatch = dispatchMock;

  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SelectionMenu />
        </BrowserRouter>
      </Provider>,
    );
  });

  test('should show action menu on select persons', async () => {
    const menu = await screen.findByTestId('selection-menu');

    expect(menu).toBeInTheDocument();
  });

  test('should show correct selected count', async () => {
    const menuText = await screen.findByTestId('selection-menu-count');

    expect(menuText).toHaveTextContent('2 items are selected');
  });

  test('should reset all selected data in store', async () => {
    const unselectAllButton = await screen.findByTestId('selection-menu-unselect-all');

    await act(async () => {
      fireEvent.click(unselectAllButton);
    });

    expect(dispatchMock).toHaveBeenCalledWith({ payload: undefined, type: 'persons/clearSelected' });
  });

  test('should generate and download csv file', async () => {
    const downloadButton = await screen.findByTestId('selection-menu-download');

    (URL.createObjectURL as jest.Mock) = jest.fn(() => 'test');

    expect(downloadButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(downloadButton);
    });

    expect(downloadButton).toHaveAttribute('href', 'test');
  });
});
