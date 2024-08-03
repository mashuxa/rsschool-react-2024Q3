import { NextPage } from "next";
import { NextPageProps } from "../types";
import Sidebar from "../components/Sidebar/Sidebar";

const Home: NextPage<NextPageProps> = ({ params, searchParams }) => {
  return (
    <div data-testid="home-page" className="w-1/2">
      <Sidebar searchParams={searchParams} params={params} />
    </div>
  );
};

export default Home;
