import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.tsx';
import ThemeSwitch from '../../components/ThemeSwitcher/ThemeSwitcher.tsx';

const Home: FC = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-slate-800">
      <div className="flex justify-end">
        <ThemeSwitch />
      </div>
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
