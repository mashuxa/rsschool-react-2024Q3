import { render, screen } from '@testing-library/react';
import mockData from '../../__mocks__/persons.ts';
import { BrowserRouter } from 'react-router-dom';
import PersonCard from './PersonCard.tsx';

describe('PersonCard', () => {
  const data = mockData[0];

  test('should render relevant card data', () => {
    render(
      <BrowserRouter>
        <PersonCard {...data} />
      </BrowserRouter>,
    );
    const link = screen.getByTestId('person-card');
    const header = screen.getByTestId('person-card-header');

    expect(link).toHaveAttribute('href', '/detail/1');
    expect(header).toHaveTextContent(data.name);
  });
});
