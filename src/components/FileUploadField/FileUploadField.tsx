import { FC } from "react";
import { errorStyles, inputStyles, labelStyles } from "../../styles.ts";

interface FileUploadFieldProps {
  label: string;
  name: string;
  errors: Record<string, string>;
}

const FileUploadField: FC<FileUploadFieldProps> = ({ label, name, errors }) => {
  return (
    <div>
      <label htmlFor={name} className={labelStyles}>
        {label}
      </label>
      <input id={name} name={name} type="file" accept="image/png, image/jpeg" className={inputStyles} />
      <p className={errorStyles}>{errors[name] || " "}</p>
    </div>
  );
};

export default FileUploadField;
