import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { fetcher } from '../../api/fetcher';
import mockData from '../../__mocks__/persons.ts';
import { routes } from '../../router/router.tsx';
import { act } from 'react';

jest.mock('../../api/fetcher');

const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
});

describe('Home Page', () => {
  let links: HTMLElement[];

  beforeEach(async () => {
    (fetcher as jest.Mock).mockImplementation((url: string) => {
      return Promise.resolve(url.startsWith('?') ? { results: mockData, count: mockData.length } : mockData[0]);
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
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

    expect(fetcher).toHaveBeenNthCalledWith(2, '4');
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
