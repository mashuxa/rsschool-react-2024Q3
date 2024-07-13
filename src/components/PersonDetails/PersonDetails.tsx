import { FC } from 'react';
import { NavLink, useLoaderData, useNavigation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.tsx';
import { Person } from '../../types.ts';

const PersonDetails: FC = () => {
  const { details } = useLoaderData() as { details: Person };
  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = details;
  const { state } = useNavigation();

  return (
    <div className="max-w-80 m-auto">
      <NavLink className="block border p-4 mb-4 bg-white hover:bg-blue-50" to={'/'}>
        ✖ close
      </NavLink>
      {state === 'loading' ? (
        <Preloader />
      ) : (
        <div className="card p-4 bg-gray-50 border-gray-300 rounded-md shadow-md">
          <h3 className="text-xl font-semibold py-4">{name}</h3>
          <div className="text-sm text-gray-700">
            <p>
              <strong>Height:</strong> {height} cm
            </p>
            <p>
              <strong>Mass:</strong> {mass} kg
            </p>
            <p>
              <strong>Hair Color:</strong> {hair_color}
            </p>
            <p>
              <strong>Skin Color:</strong> {skin_color}
            </p>
            <p>
              <strong>Eye Color:</strong> {eye_color}
            </p>
            <p>
              <strong>Birth Year:</strong> {birth_year}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonDetails;
