import LoginMain from "@/domains/Login/organisms/LoginMain";
import LoginTemplate from "@/domains/Login/templates/LoginTemplate";

function Login() {
  return <LoginTemplate rightComponent={LoginMain} />;
}

export default Login;
