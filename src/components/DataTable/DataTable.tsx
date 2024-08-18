import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store.ts";
import { FormFields } from "../../types.ts";
import CellData from "./CellData/CellData.tsx";

const gridStyles = "transition grid grid-cols-3 gap-4 p-4 mt-12 border rounded-lg border-2 border-slate-100";
const headerStyles = "font-bold";

const DataTable: FC = () => {
  const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledForm);
  const reactHookFormData = useSelector((state: RootState) => state.reactHookForm);
  const navigate = useNavigate();
  const location = useLocation();
  const success = location.state?.success;

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate(location.pathname, { replace: true, state: {} });
      }, 5000);
    }
  }, [location.pathname, navigate, success]);

  return (
    <div className={`${gridStyles} ${success && "border-emerald-600 bg-emerald-50"}`}>
      <div className={headerStyles}>Fields</div>
      <div className={headerStyles}>Uncontrolled Form Data</div>
      <div className={headerStyles}>React Hook Form Data</div>
      {Object.entries(FormFields).map(([key, fieldName]) => {
        return (
          <React.Fragment key={fieldName}>
            <div className={headerStyles}>{key}:</div>
            <div>
              <CellData data={uncontrolledFormData} fieldName={fieldName} />
            </div>
            <div>
              <CellData data={reactHookFormData} fieldName={fieldName} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DataTable;
