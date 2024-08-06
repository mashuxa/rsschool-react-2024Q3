import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { Person } from '../../types.ts';
import PersonCard from '../PersonCard/PersonCard.tsx';

interface PersonCardListProps {
  data: Person[];
}

const PersonCardList: FC<PersonCardListProps> = ({ data }) => {
  const selectedPersons = useSelector(({ persons }: RootState) => persons.selectedPersons);

  return data.length ? (
    <div className="space-y-4 pb-16 rounded-md wrapper">
      {data.map((data, index) => (
        <PersonCard key={index} {...data} isSelected={!!selectedPersons[data.id]} />
      ))}
    </div>
  ) : (
    <i data-testid="no-data">No data</i>
  );
};

export default PersonCardList;
