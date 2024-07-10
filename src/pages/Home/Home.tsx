import { FC } from 'react';

import { Film } from '../../types';
import SearchForm from '../../components/SearchForm/SearchForm';
import FilmCard from '../../components/FilmCard/FilmCard';
import { useState } from 'react';

interface Film {
  title: string;
  opening_crawl: string;
}

const Home: FC = () => {
  const [films, setFilms] = useState<Film[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg mx-auto">
        <SearchForm onSuccess={setFilms} />
        <div className="mt-6 space-y-4 p-6 border border-gray-300 rounded-md">
          <h2>Search results: {films.length}</h2>
          {films.map(({ title, opening_crawl }, index) => (
            <FilmCard key={index} title={title} description={opening_crawl} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
