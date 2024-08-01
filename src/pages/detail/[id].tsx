import { FC } from "react";
import PersonDetails from "src/components/PersonDetails/PersonDetails";
import Layout from "src/components/Layout/Layout";
import { DataProvider } from "src/providers/DataProvider/DataProvider";
import { DataProps, fetchPersons, fetchDetails } from "src/api/fetch";
import { GetServerSideProps } from "next";
import { Person } from "src/types";

interface DetailsProps extends DataProps {
  details: Person;
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { search, page, id },
}) => {
  const [persons, details] = await Promise.all([
    fetchPersons(page as string, search as string),
    id ? fetchDetails(id as string) : Promise.resolve({}),
  ]);

  return { props: { details, persons } };
};

const Details: FC<DetailsProps> = ({ persons, details }) => {
  return (
    <DataProvider persons={persons} details={details}>
      <Layout>
        <PersonDetails />
      </Layout>
    </DataProvider>
  );
};

export default Details;
