import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import { act } from 'react';
import { Provider } from 'react-redux';
import mockData from 'src/__mocks__/persons.ts';
import PersonDetails from 'src/components/PersonDetails/PersonDetails.tsx';
import { store } from 'src/store/store.ts';
import MainPage from './MainPage.tsx';

jest.mock('src/styles.css', () => ({
  __esModule: true,
  default: {},
}));

describe('Home Page', () => {
  const renderPage = (isLoading = false) => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <MainPage data={{ count: 82, results: mockData }} isLoading={isLoading} /> },
      { path: '/detail/1', Component: () => <PersonDetails data={mockData[0]} /> },
      { path: '/detail/4', Component: () => <PersonDetails data={mockData[1]} /> },
    ]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>,
    );
  };

  beforeAll(async () => {
    fetch.mockResponse(JSON.stringify({ results: mockData, count: mockData.length }));
  });

  test('should open person detailed card on click person card in list', async () => {
    await act(async () => {
      renderPage();
    });

    const links = await screen.findAllByTestId('person-card');

    await act(async () => {
      fireEvent.click(links[0]);
    });

    const details = await screen.findByTestId('detailed-card');

    expect(details).toBeInTheDocument();
  });

  test('should close detailed card on clicking close button', async () => {
    await act(async () => {
      renderPage(true);
    });

    const links = await screen.findAllByTestId('person-card');

    await act(async () => {
      fireEvent.click(links[0]);
    });

    const details = await screen.findByTestId('detailed-card');
    const closeButton = await screen.findByTestId('details-card-close');

    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(details).not.toBeInTheDocument();
  });
});
