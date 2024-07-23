import { FC, useCallback } from 'react';
import { Person } from '../../types.ts';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggle } from '../../store/personsSlice/personsSlice.ts';

interface PersonCardProps extends Person {
  isSelected: boolean;
}

const PersonCard: FC<PersonCardProps> = ({ isSelected, ...data }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const handleCheckbox = useCallback(() => {
    dispatch(toggle(data));
  }, [data, dispatch]);

  return (
    <div className="flex items-center">
      <input
        className="block h-8 w-8 mr-8 leading-10 cursor-pointer"
        checked={isSelected}
        type="checkbox"
        onChange={handleCheckbox}
      />
      <NavLink
        data-testid="person-card"
        to={params.id === data.id ? `/?${searchParams.toString()}` : `/detail/${data.id}?${searchParams.toString()}`}
        className="text-xl font-semibold"
      >
        <div
          data-testid="person-card-header"
          className="result-item card p-4 bg-gray-50 dark:bg-gray-600 dark:text-slate-50 border-gray-300 rounded-md shadow-md"
        >
          {data.name}
        </div>
      </NavLink>
    </div>
  );
};

export default PersonCard;
