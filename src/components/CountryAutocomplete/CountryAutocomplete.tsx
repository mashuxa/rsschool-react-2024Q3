import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { errorStyles, inputStyles } from "../../styles.ts";

const labelStyles = "block mb-1 font-semibold";

interface CountryAutocompleteProps {
  label: string;
  name: string;
  error?: string;
}

const CountryAutocomplete: FC<CountryAutocompleteProps> = ({ label, name, error }) => {
  const countries = useSelector((state: RootState) => state.countries);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>(countries);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = () => {
    const inputValue = inputRef.current?.value || "";

    if (inputValue.trim() === "") {
      setSuggestions(countries);
    } else {
      const filteredSuggestions = countries.filter((country: string) =>
        country.toLowerCase().includes(inputValue.toLowerCase()),
      );

      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion;
    }

    setSuggestions(countries);
    setIsFocused(false);
  };

  return (
    <div className="relative focus-visible:outline-0">
      <label htmlFor={name} className={labelStyles}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        className={inputStyles}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto bg-white w-full shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <p className={errorStyles}>{error || " "}</p>
    </div>
  );
};

export default CountryAutocomplete;
