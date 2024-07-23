import { FC } from 'react';
import SearchForm from '../SearchForm/SearchForm.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import PersonCardList from '../PersonCardList/PersonCardList.tsx';
import SelectionMenu from '../SelectionMenu/SelectionMenu.tsx';

const Sidebar: FC = () => {
  return (
    <>
      <SearchForm />
      <div>
        <Pagination />
        <PersonCardList />
        <SelectionMenu />
      </div>
    </>
  );
};

export default Sidebar;
