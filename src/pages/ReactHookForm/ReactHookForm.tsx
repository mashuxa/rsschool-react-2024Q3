import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountryAutocomplete from "../../components/CountryAutocomplete/CountryAutocomplete";
import FileUploadField from "../../components/FileUploadField/FileUploadField";
import FormField from "../../components/FormField/FormField";
import Select from "../../components/Select/Select";
import { genderOptions } from "../../constants.ts";
import { setValues } from "../../store/slices/reactHookFormSlice.ts";
import { buttonStyles, formStyles } from "../../styles.ts";
import { FormValues } from "../../types.ts";
import { convertFileToBase64 } from "../../utils/utils.ts";
import { validationSchema } from "../../validationSchema";

const ReactHookForm: FC = () => {
  const { handleSubmit, formState, register, setValue, trigger } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ picture, ...values }: FormValues) => {
    const base64Picture = await convertFileToBase64(picture as FileList);

    dispatch(setValues({ ...values, base64Picture }));
    navigate("/", { state: { success: true } });
  };

  const errors = Object.entries(formState.errors).reduce(
    (acc, [key, value]) => {
      acc[key] = value.message as string;

      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formStyles}>
      <FormField register={register} name="name" label="Name" errors={errors} />
      <FormField register={register} type="number" name="age" label="Age" errors={errors} />
      <FormField register={register} name="email" label="Email" errors={errors} />
      <Select register={register} name="gender" label="Gender" options={genderOptions} errors={errors} />
      <FormField register={register} type="password" name="password" label="Password" errors={errors} />
      <FormField register={register} type="password" name="confirmPassword" label="Confirm Password" errors={errors} />
      <FormField
        register={register}
        trigger={trigger}
        setValue={setValue}
        type="checkbox"
        name="acceptTerms"
        label="Accept Terms"
        errors={errors}
      />
      <FileUploadField register={register} name="picture" label="Upload Picture" errors={errors} />
      <CountryAutocomplete trigger={trigger} setValue={setValue} name="country" label="Country" errors={errors} />

      <div className="col-span-2">
        <button type="submit" className={`${buttonStyles} disabled:grayscale`} disabled={!!Object.keys(errors).length}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReactHookForm;
