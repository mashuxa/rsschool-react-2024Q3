import { FC } from 'react';
import { Person } from '../../types.ts';
import PersonCard from '../PersonCard/PersonCard.tsx';

interface PersonCardListProps {
  data: Person[];
}

const PersonCardList: FC<PersonCardListProps> = ({ data }) => {
  return data.length ? (
    <div className="space-y-4 rounded-md wrapper">
      {data.map((data, index) => (
        <PersonCard key={index} {...data} />
      ))}
    </div>
  ) : (
    <i>No data</i>
  );
};

export default PersonCardList;
