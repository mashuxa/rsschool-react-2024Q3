import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PersonDetails from './PersonDetails.tsx';
import mockData from '../../__mocks__/persons.ts';
import * as router from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: jest.fn(),
  useLoaderData: jest.fn(),
}));

describe('PersonDetails', () => {
  let useNavigationSpy: jest.SpyInstance;
  let useLoaderDataSpy: jest.SpyInstance;

  beforeEach(() => {
    useNavigationSpy = jest.spyOn(router, 'useNavigation');
    useLoaderDataSpy = jest.spyOn(router, 'useLoaderData');
    useLoaderDataSpy.mockReturnValue({ details: mockData[0] });
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <PersonDetails />
      </BrowserRouter>,
    );
  };

  test('should show loading indicator on fetching data', async () => {
    useNavigationSpy.mockReturnValue({ state: 'loading' });

    renderComponent();

    const preloader = await screen.findByTestId('preloader');

    expect(preloader).toBeInTheDocument();
  });

  test('should render detailed card component correctly', async () => {
    useNavigationSpy.mockReturnValue({ state: '' });
    renderComponent();

    expect(await screen.findByTestId('detailed-card-name')).toHaveTextContent('Luke Skywalker');
    expect(await screen.findByTestId('detailed-card-height')).toHaveTextContent('Height: 172 cm');
    expect(await screen.findByTestId('detailed-card-mass')).toHaveTextContent('Mass: 77 kg');
    expect(await screen.findByTestId('detailed-card-hair')).toHaveTextContent('Hair Color: blond');
    expect(await screen.findByTestId('detailed-card-skin')).toHaveTextContent('Skin Color: fair');
    expect(await screen.findByTestId('detailed-card-eye')).toHaveTextContent('Eye Color: blue');
    expect(await screen.findByTestId('detailed-card-year')).toHaveTextContent('Birth Year: 19BBY');
    expect(await screen.findByTestId('detailed-card-gender')).toHaveTextContent('Gender: male');
  });
});
