import { FC } from 'react';
import { Person } from '../../types.ts';

const PersonCard: FC<Partial<Person>> = ({
  name,
  height,
  mass,
  hair_color,
  skin_color,
  eye_color,
  birth_year,
  gender,
}) => {
  return (
    <div className="result-item card p-4 bg-gray-50 border-gray-300 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
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
  );
};

export default PersonCard;
