import { FC, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import PersonCard from '../PersonCard/PersonCard.tsx';
import { FetchDataType, Person } from '../../types.ts';

const Sidebar: FC = () => {
  const [data, setData] = useState<FetchDataType<Person>>({ count: 0, results: [] });

  return (
    <>
      <SearchForm onSuccess={setData} />
      <div className="transition hover:bg-blue-50">
        {!!data.count && <Pagination totalCount={data.count} />}
        <div className="space-y-4 rounded-md wrapper">
          {data.results.map((data, index) => (
            <PersonCard key={index} {...data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
