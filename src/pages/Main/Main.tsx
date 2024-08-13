import { FC } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable.tsx";

const linkCss = "p-2 block text-xl text-slate-700";

const Main: FC = () => {
  return (
    <div>
      <ul>
        <li>
          <Link className={linkCss} to="/uncontrolled-form">
            Route for the form created using <b>uncontrolled</b> components approach →
          </Link>
        </li>
        <li>
          <Link className={linkCss} to="/hook-form">
            Route for the similar form, but <b>created using React Hook Form</b> →
          </Link>
        </li>
      </ul>
      <DataTable />
    </div>
  );
};

export default Main;
