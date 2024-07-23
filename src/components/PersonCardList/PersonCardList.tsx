import { FC } from 'react';
import PersonCard from '../PersonCard/PersonCard.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

const PersonCardList: FC = () => {
  const { results } = useSelector((state: RootState) => state.persons.currentPage);
  const selectedPersons = useSelector(({ persons }: RootState) => persons.selectedPersons);

  return results.length ? (
    <div className="space-y-4 pb-16 rounded-md wrapper">
      {results.map((data, index) => (
        <PersonCard key={index} {...data} isSelected={!!selectedPersons[data.id]} />
      ))}
    </div>
  ) : (
    <i data-testid="no-data">No data</i>
  );
};

export default PersonCardList;
