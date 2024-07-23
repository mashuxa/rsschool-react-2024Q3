import { render, screen } from '@testing-library/react';
import PersonCardList from './PersonCardList';
import { BrowserRouter } from 'react-router-dom';
import mockData from '../../__mocks__/persons.ts';
import { Provider } from 'react-redux';
import { createStore } from '../../store/store.ts';
import { Person } from '../../types.ts';

describe('PersonCardList', () => {
  const renderComponent = (results: Person[], count: number) => {
    const mockStore = createStore({
      persons: {
        currentPage: { results, count },
        selectedPersons: {},
      },
    });

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PersonCardList />
        </BrowserRouter>
      </Provider>,
    );
  };

  test('should render the specified number of PersonCard components', () => {
    renderComponent(mockData, mockData.length);

    expect(screen.getAllByTestId('person-card')).toHaveLength(mockData.length);
  });

  test('should display "No data" message when no data is present', () => {
    renderComponent([], 0);

    expect(screen.getByTestId('no-data')).toHaveTextContent('No data');
  });
});
