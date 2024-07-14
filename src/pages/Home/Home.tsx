import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.tsx';

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex items-start mx-auto">
        <div className="w-1/2">
          <Sidebar />
        </div>
        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
