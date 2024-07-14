import { FC } from 'react';

const ErrorPage: FC = () => {
  return (
    <div className="text-5xl text-center mt-60">
      <h1 className="text-red-800 border text-5xl">404 Error: </h1>
      Not Found
    </div>
  );
};

export default ErrorPage;
