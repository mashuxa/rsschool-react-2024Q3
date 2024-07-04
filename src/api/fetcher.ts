import { API_URL } from './constatnts';

export const fetcher = async <T>(url: string): Promise<T> => {
  const result = await fetch(`${API_URL}/${url}`);

  return (await result.json()) as T;
};
