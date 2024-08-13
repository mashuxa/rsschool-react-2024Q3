import { FC } from "react";
import { FormFields, FormValues } from "../../../types.ts";

interface CellDataProps {
  data: FormValues;
  fieldName: FormFields;
}

const CellData: FC<CellDataProps> = ({ fieldName, data }) => {
  const value = data[fieldName];

  if (!value) {
    return "No data";
  }

  if (fieldName === FormFields.Picture) {
    return <img src={value as string} alt="img" />;
  }

  if (fieldName === FormFields.AcceptTerms) {
    return value ? "✅" : "❎";
  }

  return value;
};

export default CellData;
