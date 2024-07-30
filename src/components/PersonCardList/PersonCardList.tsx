import { FC, useContext } from "react";
import PersonCard from "src/components/PersonCard/PersonCard";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { DataContext } from "src/providers/DataProvider/DataProvider";

const PersonCardList: FC = () => {
  const selectedPersons = useSelector(
    ({ persons }: RootState) => persons.selectedPersons,
  );
  const { persons } = useContext(DataContext);

  return persons?.results.length ? (
    <div className="space-y-4 pb-16 rounded-md wrapper">
      {persons.results.map((data, index) => (
        <PersonCard
          key={index}
          {...data}
          isSelected={!!selectedPersons[data.id]}
        />
      ))}
    </div>
  ) : (
    <i data-testid="no-data">No data</i>
  );
};

export default PersonCardList;
