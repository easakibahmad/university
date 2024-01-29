import { Input } from "antd";
import { Controller } from "react-hook-form";

type TFormInputProps = {
  type: string;
  name: string;
  label?: string;
};
const UInput = ({ type, name, label }: TFormInputProps) => {
  //   const { register } = useFormContext();
  return (
    <>
      {label && label}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            style={{ marginBottom: "10px" }}
            {...field}
            type={type}
            id={name}
          />
        )}
      />
    </>
  );
};

export default UInput;
