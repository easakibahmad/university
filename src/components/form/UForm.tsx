import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
};
type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const UForm = ({ children, onSubmit, defaultValues }: TFormProps) => {
  const formDefaultConfig: TFormConfig = {};

  if (defaultValues) {
    formDefaultConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formDefaultConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default UForm;
