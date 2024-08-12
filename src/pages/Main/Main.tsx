import { FC } from "react";
import { Link } from "react-router-dom";

const linkCss = "p-2 block text-xl text-slate-700";

const Main: FC = () => {
  return (
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
  );
};

export default Main;
