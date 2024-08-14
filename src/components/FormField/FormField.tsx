import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { errorStyles, inputStyles, labelStyles } from "../../styles.ts";
import { FormValues } from "../../types.ts";
import PasswordStrength from "../PasswordStrength/PasswordStrength.tsx";
import { Tests } from "../PasswordStrength/types.ts";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: keyof FormValues;
  errors: Record<string, string>;
  className?: string;
  register?: UseFormRegister<FormValues>;
  setValue?: UseFormSetValue<FormValues>;
  trigger?: UseFormTrigger<FormValues>;
}

const FormField: FC<FormFieldProps> = ({ label, name, errors, className, register, type, setValue, trigger }) => {
  const [passedTests, setPassedTests] = useState<Tests[]>([]);
  const [inFocus, setInFocus] = useState(false);

  const handleFocus = () => setInFocus(true);

  const inputProps = register && register(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputProps?.onChange) {
      void inputProps.onChange(event);
    }

    if (type === "checkbox") {
      if (setValue) {
        setValue(name, event.currentTarget.checked ? "on" : "");
      }

      if (trigger) {
        void trigger(name);
      }
    } else if (type === "password") {
      const value = event.target.value;
      const passedTests = [];

      if (/\d/.test(value)) {
        passedTests.push(Tests.number);
      }

      if (/[A-Z]/.test(value)) {
        passedTests.push(Tests.uppercasedLetter);
      }

      if (/[a-z]/.test(value)) {
        passedTests.push(Tests.lowercasedLetter);
      }

      if (/[^A-Za-z0-9]/.test(value)) {
        passedTests.push(Tests.specialCharacter);
      }

      setPassedTests(passedTests);
    }
  };
  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputProps?.onBlur) {
      void inputProps.onBlur(event);
    }

    setInFocus(false);
  };

  return (
    <div className="relative">
      <label htmlFor={name} className={labelStyles}>
        {label}:
      </label>
      <input
        id={name}
        name={name}
        className={`${inputStyles} ${className}`}
        type={type}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...(type !== "checkbox" && inputProps && { ref: inputProps.ref })}
      />
      {type === "password" && inFocus && <PasswordStrength passedTests={passedTests} />}
      <p className={errorStyles}>{errors[name] || " "}</p>
    </div>
  );
};

export default FormField;
