import { FC } from 'react';

import { FetchDataType, Person } from '../../types';
import SearchForm from '../../components/SearchForm/SearchForm';
import PersonCard from '../../components/PersonCard/PersonCard.tsx';
import { useState } from 'react';
import Pagination from '../../components/Pagination/Pagination.tsx';

const DEFAULT_PAGE = 1;

const Home: FC = () => {
  const [data, setData] = useState<FetchDataType<Person>>({ count: 0, results: [] });
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg mx-auto">
        <SearchForm onSuccess={setData} page={currentPage} setPage={setCurrentPage} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={data.count} />
        <div className="mt-6 space-y-4 p-6 border border-gray-300 rounded-md">
          {data.results.map((data, index) => (
            <PersonCard key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
