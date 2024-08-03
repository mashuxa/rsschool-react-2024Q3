import { Person } from "src/types";
import { createObjectCsvStringifier } from "csv-writer";
import { ReadonlyURLSearchParams } from "next/navigation";

export const generateCsvBlob = (data: Person[]): Blob => {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: "name", title: "Name" },
      { id: "birth_year", title: "Birth Year" },
      { id: "mass", title: "Mass" },
    ],
  });

  const csvContent =
    csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

  return new Blob([csvContent], { type: "text/csv" });
};

export const normalizePersons = (data: Person[]) => {
  return data.map((data) => ({
    ...data,
    id: data.url.slice(0, -1).split("/").pop() || "",
  }));
};

export const updateSearchParams = (
  params: ReadonlyURLSearchParams,
  newParams: Record<string, string>,
): string => {
  const urlParams = new URLSearchParams(params.toString());

  Object.entries(newParams).forEach(([key, value]) => {
    urlParams.set(key, value);
  });

  return urlParams.toString();
};
