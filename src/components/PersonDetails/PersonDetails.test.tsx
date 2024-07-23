import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PersonDetails from './PersonDetails.tsx';
import mockData from '../../__mocks__/persons.ts';
import * as router from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import api from '../../api/api.ts';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('PersonDetails', () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PersonDetails />
        </BrowserRouter>
      </Provider>,
    );
  };
  const useParamsSpy: jest.SpyInstance = jest.spyOn(router, 'useParams');
  const useGetPersonSpy: jest.SpyInstance = jest.spyOn(api, 'useGetPersonQuery');

  useParamsSpy.mockReturnValue({ id: '1' });

  test('should show loading indicator on fetching data', async () => {
    useGetPersonSpy.mockReturnValue({ isLoading: true });
    renderComponent();

    const preloader = await screen.findByTestId('preloader');

    expect(preloader).toBeInTheDocument();
  });

  test('should render detailed card component correctly', async () => {
    useGetPersonSpy.mockReturnValue({ isLoading: false, data: mockData[0] });
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

  test('should render detailed card component correctly', async () => {
    useGetPersonSpy.mockReturnValue({ isLoading: false, data: mockData[0] });
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
