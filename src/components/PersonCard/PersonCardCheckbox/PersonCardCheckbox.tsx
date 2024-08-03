"use client";

import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "src/store/personsSlice/personsSlice";
import { RootState } from "src/store/store";
import { Person } from "src/types";

interface PersonCardCheckboxProps {
  data: Person;
}

const PersonCardCheckbox: FC<PersonCardCheckboxProps> = ({ data }) => {
  const isSelected = useSelector(
    ({ persons }: RootState) => !!persons.selectedPersons[data.id],
  );
  const dispatch = useDispatch();
  const handleCheckbox = useCallback(() => {
    dispatch(toggle(data));
  }, [data, dispatch]);

  return (
    <input
      className="block h-8 w-8 mr-8 leading-10 cursor-pointer"
      checked={isSelected}
      type="checkbox"
      onChange={handleCheckbox}
    />
  );
};

export default PersonCardCheckbox;
