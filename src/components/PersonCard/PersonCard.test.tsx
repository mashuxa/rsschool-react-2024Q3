import { render, screen } from '@testing-library/react';
import mockData from '../../__mocks__/persons.ts';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PersonCard from './PersonCard.tsx';
import { store } from '../../store/store.ts';

describe('PersonCard', () => {
  const data = mockData[0];

  test('should render relevant card data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PersonCard isSelected={false} {...data} />
        </BrowserRouter>
      </Provider>,
    );
    const link = screen.getByTestId('person-card');
    const header = screen.getByTestId('person-card-header');

    expect(link).toHaveAttribute('href', '/detail/1');
    expect(header).toHaveTextContent(data.name);
  });
});
