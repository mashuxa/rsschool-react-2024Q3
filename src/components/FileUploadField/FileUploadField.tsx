import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { errorStyles, inputStyles, labelStyles } from "../../styles.ts";
import { FormValues } from "../../types.ts";

interface FileUploadFieldProps {
  label: string;
  name: keyof FormValues;
  errors: Record<string, string>;
  register?: UseFormRegister<FormValues>;
}

const FileUploadField: FC<FileUploadFieldProps> = ({ label, name, errors, register }) => {
  const props = register ? { ...register(name) } : {};

  return (
    <div>
      <label htmlFor={name} className={labelStyles}>
        {label}
      </label>
      <input {...props} id={name} name={name} type="file" accept="image/png, image/jpeg" className={inputStyles} />
      <p className={errorStyles}>{errors[name] || " "}</p>
    </div>
  );
};

export default FileUploadField;
