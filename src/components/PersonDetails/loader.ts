import { fetcher } from '../../api/fetcher.ts';
import { Person } from '../../types.ts';
import { LoaderFunction } from 'react-router-dom';

const loader: LoaderFunction = async ({ params }) => {
  const details = await fetcher<Person>(params.id as string);

  return { details };
};

export default loader;
