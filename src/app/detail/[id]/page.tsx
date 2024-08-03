import { NextPage } from "next";
import { NextPageProps } from "src/types";
import { fetchDetails } from "src/api/fetch";
import PersonDetails from "src/components/PersonDetails/PersonDetails";
import Link from "next/link";
import Sidebar from "src/components/Sidebar/Sidebar";

const Details: NextPage<NextPageProps> = async ({ params, searchParams }) => {
  const data = await fetchDetails(params.id).catch(() => ({}));

  return (
    <>
      <div data-testid="home-page" className="w-1/2">
        <Sidebar searchParams={searchParams} params={params} />
      </div>
      <div data-testid="home-page" className="w-1/2">
        <Link
          data-testid="details-card-close"
          className="block border p-4 mb-4 max-w-80 m-auto bg-white hover:bg-blue-50"
          href={`/?page=${searchParams.page}&search=${searchParams.search || ""}`}
        >
          ✖ close
        </Link>
        <PersonDetails data={data} />
      </div>
    </>
  );
};

export default Details;
