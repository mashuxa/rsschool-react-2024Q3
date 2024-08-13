import { FC } from "react";
import { Tests } from "./types.ts";

interface PasswordStrengthProps {
  passedTests: Tests[];
}

const PasswordStrength: FC<PasswordStrengthProps> = ({ passedTests }) => {
  return (
    <p className="absolute top-0 right-0 z-10 text-xs mt-1">
      {Object.values(Tests).map((value) => (
        <i key={value} className={passedTests.includes(value) ? "text-green-600" : "text-slate-600"}>
          {value}
        </i>
      ))}
    </p>
  );
};

export default PasswordStrength;
