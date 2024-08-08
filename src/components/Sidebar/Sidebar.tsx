import { FC } from 'react';
import { FetchDataType, Person } from '../../types.ts';
import Pagination from '../Pagination/Pagination.tsx';
import PersonCardList from '../PersonCardList/PersonCardList.tsx';
import SearchForm from '../SearchForm/SearchForm.tsx';
import SelectionMenu from '../SelectionMenu/SelectionMenu.tsx';

interface SidebarProps {
  data: FetchDataType<Person>;
}

const Sidebar: FC<SidebarProps> = ({ data }) => {
  return (
    <>
      <SearchForm />
      <div>
        <Pagination count={data.count} />
        <PersonCardList data={data.results} />
        <SelectionMenu />
      </div>
    </>
  );
};

export default Sidebar;
