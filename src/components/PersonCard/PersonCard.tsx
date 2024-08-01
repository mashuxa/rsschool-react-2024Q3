import { FC, useCallback, useMemo } from "react";
import { Person } from "src/types";
import { useDispatch } from "react-redux";
import { toggle } from "src/store/personsSlice/personsSlice";
import Link from "next/link";
import { useRouter } from "next/router";

interface PersonCardProps extends Person {
  isSelected: boolean;
}

const PersonCard: FC<PersonCardProps> = ({ isSelected, ...data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const personId = useMemo(
    () => (router.query.id || "") as string,
    [router.query.id],
  );
  const page = useMemo(
    () => (router.query.page || "") as string,
    [router.query.page],
  );
  const handleCheckbox = useCallback(() => {
    dispatch(toggle(data));
  }, [data, dispatch]);

  return (
    <div className="flex items-center">
      <input
        className="block h-8 w-8 mr-8 leading-10 cursor-pointer"
        checked={isSelected}
        type="checkbox"
        onChange={handleCheckbox}
      />
      <Link
        data-testid="person-card"
        href={
          personId === data.id
            ? `/?page=${page}`
            : `/detail/${data.id}?page=${page}`
        }
        className="text-xl font-semibold"
      >
        <div
          data-testid="person-card-header"
          className="result-item card p-4 bg-gray-50 dark:bg-gray-600 dark:text-slate-50 border-gray-300 rounded-md shadow-md"
        >
          {data.name}
        </div>
      </Link>
    </div>
  );
};

export default PersonCard;
