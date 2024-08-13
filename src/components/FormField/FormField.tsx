import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import { errorStyles, inputStyles, labelStyles } from "../../styles.ts";
import PasswordStrength from "../PasswordStrength/PasswordStrength.tsx";
import { Tests } from "../PasswordStrength/types.ts";

interface SelectPropsProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  errors: Record<string, string>;
}

const FormField: FC<SelectPropsProps> = ({ label, name, errors, className, ...inputProps }) => {
  const [passedTests, setPassedTests] = useState<Tests[]>([]);
  const [inFocus, setInFocus] = useState(false);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;

    if (/\d/.test(value)) {
      setPassedTests((prev) => [...prev, Tests.number]);
    }

    if (/[A-Z]/.test(value)) {
      setPassedTests((prev) => [...prev, Tests.uppercasedLetter]);
    }

    if (/[a-z]/.test(value)) {
      setPassedTests((prev) => [...prev, Tests.lowercasedLetter]);
    }

    if (/[^A-Za-z0-9]/.test(value)) {
      setPassedTests((prev) => [...prev, Tests.specialCharacter]);
    }
  };
  const handleFocus = () => setInFocus(true);
  const handleBlur = () => setInFocus(false);

  return (
    <div className="relative">
      <label htmlFor={name} className={labelStyles}>
        {label}:
      </label>
      <input
        {...inputProps}
        id={name}
        name={name}
        className={`${inputStyles} ${className}`}
        onChange={inputProps.type === "password" ? handleInputChange : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {inputProps.type === "password" && inFocus && <PasswordStrength passedTests={passedTests} />}
      <p className={errorStyles}>{errors[name] || " "}</p>
    </div>
  );
};

export default FormField;
