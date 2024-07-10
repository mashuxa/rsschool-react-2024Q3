import { FC } from 'react';

interface FilmCardProps {
  title: string;
  description: string;
}

const FilmCard: FC<FilmCardProps> = ({ title, description }) => {
  return (
    <div className="result-item card p-4 bg-gray-50 border-gray-300 rounded-md shadow-md">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FilmCard;
