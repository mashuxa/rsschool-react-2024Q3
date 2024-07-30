import { API_URL } from "./constatnts";
import { DEFAULT_PAGE } from "../components/Pagination/Pagination";
import { FetchDataType, Person } from "src/types";
import { normalizePersons } from "../utils/utils";

export interface DataProps {
  persons: FetchDataType<Person>;
}

export const fetchPersons = async (
  page?: string,
  search?: string,
): Promise<FetchDataType<Person>> => {
  try {
    const searchParam = search ? `&search=${search}` : "";
    const response = await fetch(
      `${API_URL}/people?page=${page || DEFAULT_PAGE}${searchParam}`,
    );

    if (!response.ok) {
      throw Error("Error");
    }

    const persons = (await response.json()) as FetchDataType<Person>;

    return { ...persons, results: normalizePersons(persons.results) };
  } catch {
    console.error("fetchPersons ERROR");

    return { count: 0, results: [] };
  }
};

export const fetchDetails = async (id: string): Promise<Partial<Person>> => {
  try {
    const response = await fetch(`${API_URL}/people/${id}`);

    if (!response.ok) {
      throw Error("Error");
    }

    return (await response.json()) as Partial<Person>;
  } catch {
    console.error("fetchPersons ERROR");
    return {};
  }
};
