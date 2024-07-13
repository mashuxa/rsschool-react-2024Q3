import { FC, useMemo } from 'react';
import { Person } from '../../types.ts';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

const PersonCard: FC<Person> = ({ name, url }) => {
  const id = useMemo(() => url.slice(0, -1).split('/').pop(), [url]);
  const params = useParams();
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={params.id === id ? `/?${searchParams.toString()}` : `/detail/${id}?${searchParams.toString()}`}
      className="text-xl font-semibold mb-2"
    >
      <div className="result-item card p-4 mb-4 bg-gray-50 border-gray-300 rounded-md shadow-md">{name}</div>
    </NavLink>
  );
};

export default PersonCard;
