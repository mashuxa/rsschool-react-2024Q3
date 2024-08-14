import { FC, InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { errorStyles, inputStyles, labelStyles } from "../../styles.ts";
import { FormValues } from "../../types.ts";

interface Options {
  value: string;
  label: string;
}

interface SelectPropsProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: keyof FormValues;
  errors: Record<string, string>;
  options: Options[];
  register?: UseFormRegister<FormValues>;
}

const Select: FC<SelectPropsProps> = ({ label, name, errors, options, register }) => {
  const props = register ? { ...register(name) } : {};

  return (
    <div>
      <label htmlFor={name} className={labelStyles}>
        Gender:
      </label>
      <select {...props} defaultValue="" id={name} name={name} className={inputStyles}>
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
