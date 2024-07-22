import { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.tsx';
import api from '../../api/api.ts';

const PersonDetails: FC = () => {
  const { id = '' } = useParams();
  const { isLoading, data } = api.useGetPersonQuery(id.toString());
  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = data || {};

  return (
    <div data-testid="detailed-card" className="max-w-80 m-auto">
      <NavLink data-testid="details-card-close" className="block border p-4 mb-4 bg-white hover:bg-blue-50" to={'/'}>
        ✖ close
      </NavLink>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="card p-4 bg-gray-50 border-gray-300 rounded-md shadow-md">
          <h3 data-testid="detailed-card-name" className="text-xl font-semibold py-4">
            {name}
          </h3>
          <div className="text-sm text-gray-700">
            <p data-testid="detailed-card-height">
              <strong>Height:</strong> {height} cm
            </p>
            <p data-testid="detailed-card-mass">
              <strong>Mass:</strong> {mass} kg
            </p>
            <p data-testid="detailed-card-hair">
              <strong>Hair Color:</strong> {hair_color}
            </p>
            <p data-testid="detailed-card-skin">
              <strong>Skin Color:</strong> {skin_color}
            </p>
            <p data-testid="detailed-card-eye">
              <strong>Eye Color:</strong> {eye_color}
            </p>
            <p data-testid="detailed-card-year">
              <strong>Birth Year:</strong> {birth_year}
            </p>
            <p data-testid="detailed-card-gender">
              <strong>Gender:</strong> {gender}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonDetails;
