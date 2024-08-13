import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const App: FC = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen flex">
      <button className="block p-4 text-slate-50 font-medium bg-slate-500" onClick={goBack}>
        ⮌ Back
      </button>
      <div className="p-4 pt-20 overflow-y-auto grow">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
