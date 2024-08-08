import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import mockData from 'src/__mocks__/persons.ts';
import { renderWithRemix } from 'src/__mocks__/renderWithRemix.tsx';
import { createStore } from 'src/store/store.ts';
import { Person } from 'src/types.ts';
import PersonCardList from './PersonCardList';

describe('PersonCardList', () => {
  const renderComponent = (results: Person[]) => {
    const mockStore = createStore({
      persons: {
        selectedPersons: {},
      },
    });

    renderWithRemix(
      <Provider store={mockStore}>
        <PersonCardList data={results} />
      </Provider>,
    );
  };

  test('should render the specified number of PersonCard components', () => {
    renderComponent(mockData);

    expect(screen.getAllByTestId('person-card')).toHaveLength(mockData.length);
  });

  test('should display "No data" message when no data is present', () => {
    renderComponent([]);

    expect(screen.getByTestId('no-data')).toHaveTextContent('No data');
  });
});
