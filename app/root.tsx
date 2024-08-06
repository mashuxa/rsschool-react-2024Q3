import { LoaderFunctionArgs } from '@remix-run/node';
import { Links, Meta, Scripts, useLoaderData, useNavigation } from '@remix-run/react';
import { Provider } from 'react-redux';
import { store } from 'src/store/store.ts';
import 'src/styles.css';
import { fetchPersons } from '../src/api/api.ts';
import MainPage from '../src/components/MainPage/MainPage.tsx';
import { DEFAULT_PAGE } from '../src/components/Pagination/Pagination.tsx';
import { FetchDataType, Person } from '../src/types.ts';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || DEFAULT_PAGE;
  const search = url.searchParams.get('search') || '';

  return fetchPersons(page, search);
};

const App = () => {
  const data = useLoaderData() as FetchDataType<Person>;
  const { state } = useNavigation();

  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <title>Title</title>
        </head>
        <body>
          <MainPage data={data} isLoading={state === 'loading'} />
          <Scripts />
        </body>
      </html>
    </Provider>
  );
};

export default App;
