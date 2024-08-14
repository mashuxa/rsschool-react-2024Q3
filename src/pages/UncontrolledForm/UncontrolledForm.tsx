import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CountryAutocomplete from "../../components/CountryAutocomplete/CountryAutocomplete";
import FileUploadField from "../../components/FileUploadField/FileUploadField";
import FormField from "../../components/FormField/FormField.tsx";
import Select from "../../components/Select/Select.tsx";
import { genderOptions } from "../../constants.ts";
import { setValues } from "../../store/slices/uncontrolledFormSlice";
import { buttonStyles, formStyles } from "../../styles.ts";
import { FormFields } from "../../types.ts";
import { convertFileToBase64 } from "../../utils/utils.ts";
import { validationSchema } from "../../validationSchema";

const UncontrolledFormComponent: FC = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const fileList = formData.getAll(FormFields.Picture) as unknown;

    try {
      await validationSchema.validate({ ...values, picture: fileList }, { abortEarly: false });
      const base64Picture = await convertFileToBase64(fileList as FileList);
      // eslint-disable-next-line
      const { picture, ...rest } = values;

      dispatch(setValues({ ...rest, base64Picture }));
      setErrors({});
      navigate("/", { state: { success: true } });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = error.inner.reduce((errors: Record<string, string>, error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
          return errors;
        }, {});

        setErrors(validationErrors);
        setIsSubmitDisabled(true);
      }
    }
  };

  const handleChangeForm = () => {
    setErrors({});
    setIsSubmitDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit} onChange={handleChangeForm} className={formStyles}>
      <FormField name={FormFields.Name} label="Name" errors={errors} />
      <FormField name={FormFields.Age} label="Age" errors={errors} type="text" min={0} />
      <FormField name={FormFields.Email} label="Email" errors={errors} type="text" />
      <Select name={FormFields.Gender} label="Select your gender" errors={errors} options={genderOptions} />
      <FormField name={FormFields.Password} label="Password" errors={errors} type="password" />
      <FormField name={FormFields.ConfirmPassword} label="Confirm Password" errors={errors} type="password" />
      <FormField name={FormFields.AcceptTerms} label="Accept Terms" errors={errors} type="checkbox" className="w-4" />
      <FileUploadField label="Upload Picture" name={FormFields.Picture} errors={errors} />
      <CountryAutocomplete label="Country" name={FormFields.Country} errors={errors} />
      <div className="col-span-2">
        <button type="submit" className={`${buttonStyles} disabled:grayscale`} disabled={isSubmitDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default UncontrolledFormComponent;
