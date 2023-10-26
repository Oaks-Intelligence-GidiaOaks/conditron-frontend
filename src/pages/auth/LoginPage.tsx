import { AuthBlock } from "@/blocks";
import { LoginForm } from "@/components";

const LoginPage = () => {
  return (
    <>
      <AuthBlock Form={LoginForm} />
    </>
  );
};

export default LoginPage;
