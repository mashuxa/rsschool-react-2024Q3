import { FC } from "react";

const App: FC = () => {
  return (
    <ul>
      <li>
        <a href="">
          Route for the form created using <b>uncontrolled</b> components approach
        </a>
      </li>
      <li>
        <a href="">
          Route for the similar form, but <b>created using React Hook Form</b>
        </a>
      </li>
    </ul>
  );
};

export default App;
