import { Button, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UForm from "../components/form/UForm";
import UInput from "../components/form/UInput";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "admin123",
  //   },
  // });
  const [login] = useLoginMutation();

  // console.log(error, data);

  const defaultValues: { id: string; password: string } = {
    id: "A-0001",
    password: "admin123",
  };
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle">
      <UForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>
          <UInput type="text" name="id" label="ID:"></UInput>
        </div>
        <div>
          <UInput type="text" name="password" label="Password:"></UInput>
        </div>
        <Button htmlType="submit">Submit</Button>
      </UForm>
    </Row>
  );
};

export default Login;
