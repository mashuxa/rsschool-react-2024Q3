import { FC } from 'react';
import SearchForm from '../SearchForm/SearchForm.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import PersonCardList from '../PersonCardList/PersonCardList.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import SelectionMenu from '../SelectionMenu/SelectionMenu.tsx';

const Sidebar: FC = () => {
  const { results, count } = useSelector((state: RootState) => state.persons.currentPage);

  return (
    <>
      <SearchForm />
      <div>
        {!!count && <Pagination totalCount={count} />}
        <PersonCardList data={results} />
        <SelectionMenu />
      </div>
    </>
  );
};

export default Sidebar;
