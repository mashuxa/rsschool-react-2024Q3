import { FC } from 'react';

const Preloader: FC = () => {
  return (
    <div data-testid="preloader" className="fixed inset-0 flex space-x-2 justify-center items-center p-4 mx-auto">
      <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]"></div>
      <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]"></div>
    </div>
  );
};

export default Preloader;
