import { Person } from "src/types";

interface PersonCardListProps {
  persons: Person[];
}

import { FC } from "react";
import PersonCard from "src/components/PersonCard/PersonCard";

const PersonCardList: FC<PersonCardListProps> = ({ persons }) => {
  return persons.length ? (
    <div className="space-y-4 pb-16 rounded-md wrapper">
      {persons.map((data, index) => (
        <PersonCard key={index} {...data} />
      ))}
    </div>
  ) : (
    <i data-testid="no-data">No data</i>
  );
};

export default PersonCardList;
