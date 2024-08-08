import { Outlet } from '@remix-run/react';
import { FC } from 'react';
import Preloader from 'src/components/Preloader/Preloader.tsx';
import Sidebar from 'src/components/Sidebar/Sidebar.tsx';
import ThemeSwitch from 'src/components/ThemeSwitcher/ThemeSwitcher.tsx';
import { ThemeProvider } from 'src/providers/ThemeProvider/ThemeProvider.tsx';
import { FetchDataType, Person } from 'src/types.ts';

interface MainPageProps {
  data: FetchDataType<Person>;
  isLoading: boolean;
}
const MainPage: FC<MainPageProps> = ({ data, isLoading }) => {
  return (
    <ThemeProvider>
      {isLoading && <Preloader />}
      <div className="min-h-screen p-4 bg-gray-100 dark:bg-slate-800">
        <div className="flex">
          <ThemeSwitch />
        </div>
        <div className="flex items-start mx-auto">
          <div className="w-1/2">
            <Sidebar data={data} />
          </div>
          <div className="w-1/2">
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainPage;
