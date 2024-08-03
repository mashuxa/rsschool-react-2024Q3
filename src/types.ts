export interface Person {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: unknown;
  species: string[];
  vehicles: unknown;
  starships: unknown;
  created: string;
  edited: string;
  url: string;
}

export interface FetchDataType<T> {
  results: T[];
  count: number;
}
interface SearchParams {
  page: string;
  search: string;
}

export interface NextPageProps {
  searchParams: SearchParams;
  params: { id: string };
}
