"use client";

import { FC, useMemo } from "react";
import { Person } from "src/types";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import PersonCardCheckbox from "./PersonCardCheckbox/PersonCardCheckbox";

const PersonCard: FC<Person> = ({ ...data }) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const page = useMemo(() => searchParams.get("page"), [searchParams]);
  const search = useMemo(() => searchParams.get("search"), [searchParams]);
  const href = useMemo(() => {
    const searchString = `?page=${page}&search=${search}`;

    return params.id === data.id
      ? `/${searchString}`
      : `/detail/${data.id}${searchString}`;
  }, [data.id, page, params.id, search]);

  return (
    <div className="flex items-center">
      <PersonCardCheckbox data={data} />
      <Link
        data-testid="person-card"
        href={href}
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
