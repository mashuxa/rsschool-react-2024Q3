import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import mockData from '../../__mocks__/persons.ts';
import { routes } from '../../router/router.tsx';
import { act } from 'react';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import fetch from 'jest-fetch-mock';

const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
});

describe('Home Page', () => {
  let links: HTMLElement[];

  beforeEach(async () => {
    fetch.mockResponse(JSON.stringify({ results: mockData, count: mockData.length }));

    await act(async () => {
      render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>,
      );
    });

    links = await screen.findAllByTestId('person-card');
  });

  test('should open person detailed card on click person card in list', async () => {
    await act(async () => {
      fireEvent.click(links[0]);
    });

    const details = await screen.findByTestId('detailed-card');

    expect(details).toBeInTheDocument();
  });

  test('should trigger API call to fetch detailed information', async () => {
    await act(async () => {
      fireEvent.click(links[1]);
    });

    const call = fetch.mock.calls[0][0] as Request;

    expect(call.url).toEqual('https://swapi.dev/api/people/4');
  });

  test('should close detailed card on clicking close button', async () => {
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
