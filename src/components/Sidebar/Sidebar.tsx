import { FC, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import { FetchDataType, Person } from '../../types.ts';
import PersonCardList from '../PersonCardList/PersonCardList.tsx';

const Sidebar: FC = () => {
  const [data, setData] = useState<FetchDataType<Person>>({ count: 0, results: [] });

  return (
    <>
      <SearchForm onSuccess={setData} />
      <div className="transition hover:bg-blue-50">
        {!!data.count && <Pagination totalCount={data.count} />}
        <PersonCardList data={data.results} />
      </div>
    </>
  );
};

export default Sidebar;
