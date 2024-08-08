import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import mockData from 'src/__mocks__/persons.ts';
import { renderWithRemix } from 'src/__mocks__/renderWithRemix.tsx';
import { store } from 'src/store/store.ts';
import PersonCard from './PersonCard.tsx';

describe('PersonCard', () => {
  const data = mockData[0];

  test('should render relevant card data', () => {
    renderWithRemix(
      <Provider store={store}>
        <PersonCard isSelected={false} {...data} />
      </Provider>,
    );
    const link = screen.getByTestId('person-card');
    const header = screen.getByTestId('person-card-header');

    expect(link).toHaveAttribute('href', '/detail/1');
    expect(header).toHaveTextContent(data.name);
  });
});
