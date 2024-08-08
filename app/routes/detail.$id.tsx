import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { fetchDetails } from 'src/api/api.ts';
import PersonDetails from 'src/components/PersonDetails/PersonDetails.tsx';
import Preloader from 'src/components/Preloader/Preloader.tsx';
import { Person } from 'src/types.ts';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return fetchDetails(params.id || '');
};

export default function Details() {
  const data = useLoaderData() as Person;
  const { state } = useNavigation();

  return state === 'loading' ? <Preloader /> : <PersonDetails data={data} />;
}
