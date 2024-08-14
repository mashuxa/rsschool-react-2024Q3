import { FC } from "react";
import { FormFields, StoreFormValues } from "../../../types.ts";

interface CellDataProps {
  data: StoreFormValues;
  fieldName: FormFields;
}

const CellData: FC<CellDataProps> = ({ fieldName, data }) => {
  if (fieldName === FormFields.Picture) {
    return data.base64Picture ? <img src={data.base64Picture} alt="img" /> : "No image";
  }

  if (fieldName === FormFields.AcceptTerms) {
    return data[fieldName] === "on" ? "✅" : "❎";
  }

  if (!data[fieldName]) {
    return "No data";
  }

  return data[fieldName];
};

export default CellData;
