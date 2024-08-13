import { FC } from "react";
import { errorStyles, inputStyles, labelStyles } from "../../styles.ts";

interface Options {
  value: string;
  label: string;
}

interface SelectPropsProps {
  label: string;
  name: string;
  errors: Record<string, string>;
  options: Options[];
}

const Select: FC<SelectPropsProps> = ({ label, name, errors, options }) => {
  return (
    <div>
      <label htmlFor={name} className={labelStyles}>
        Gender:
      </label>
      <select defaultValue="" id={name} name={name} className={inputStyles}>
        <option value="" disabled>
          {label}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <p className={errorStyles}>{errors[name] || " "}</p>
    </div>
  );
};

export default Select;
