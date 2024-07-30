import { FC } from "react";
import { DataProvider } from "../providers/DataProvider/DataProvider";
import Layout from "src/components/Layout/Layout";
import { DataProps, fetchPersons } from "src/api/fetch";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({
  query: { search, page },
}) => {
  const persons = await fetchPersons(page as string, search as string);

  return { props: { persons } };
};

const Home: FC<DataProps> = ({ persons }) => {
  return (
    <DataProvider persons={persons} details={{}}>
      <Layout />
    </DataProvider>
  );
};

export default Home;
