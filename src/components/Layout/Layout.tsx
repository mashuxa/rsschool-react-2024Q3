import { FC, ReactNode } from "react";
import ThemeSwitch from "src/components/ThemeSwitcher/ThemeSwitcher";
import SearchForm from "../SearchForm/SearchForm";
import Pagination from "../Pagination/Pagination";
import PersonCardList from "../PersonCardList/PersonCardList";
import SelectionMenu from "../SelectionMenu/SelectionMenu";
import Preloader from "../Preloader/Preloader";
import useLoadingStatus from "src/hooks/useLoadingStatus/useLoadingStatus";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const loading = useLoadingStatus();

  return (
    <div
      data-testid="layout"
      className="min-h-screen p-4 bg-gray-100 dark:bg-slate-800"
    >
      <div className="flex justify-end">
        <ThemeSwitch />
      </div>
      <div className="flex items-start mx-auto">
        <div className="w-1/2">
          <SearchForm />
          <div>
            <Pagination />
            {loading && <Preloader />}
            <PersonCardList />
            <SelectionMenu />
          </div>
        </div>
        <div className="w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
