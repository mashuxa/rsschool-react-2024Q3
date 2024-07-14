import { render, screen } from '@testing-library/react';
import PersonCardList from './PersonCardList';
import { BrowserRouter } from 'react-router-dom';
import mockData from '../../__mocks__/persons.ts';
import { Person } from '../../types.ts';

describe('PersonCardList', () => {
  const renderComponent = (data: Person[]) => {
    render(
      <BrowserRouter>
        <PersonCardList data={data} />
      </BrowserRouter>,
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
