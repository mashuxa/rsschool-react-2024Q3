import { API_URL } from './constatnts.ts';

export const fetcher = async (url: string) => {
  const result = await fetch(`${API_URL}/${url}`);

  return result.json();
};
