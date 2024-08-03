import { fetchPersons } from "src/api/fetch";
import { NextPage } from "next";
import { NextPageProps } from "src/types";
import SearchForm from "src/components/SearchForm/SearchForm";
import Pagination from "src/components/Pagination/Pagination";
import PersonCardList from "src/components/PersonCardList/PersonCardList";
import SelectionMenu from "src/components/SelectionMenu/SelectionMenu";

const Sidebar: NextPage<NextPageProps> = async ({
  searchParams: { page, search },
}) => {
  const { count, results } = await fetchPersons(page, search).catch(() => ({
    results: [],
    count: 0,
  }));

  return (
    <>
      <SearchForm />
      <div>
        <Pagination count={count} />
        <PersonCardList persons={results} />
        <SelectionMenu />
      </div>
    </>
  );
};

export default Sidebar;
