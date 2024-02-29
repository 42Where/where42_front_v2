import LoginMain from '@/domains/Login/organisms/LoginMain';
import LoginTemplate from '@/domains/Login/templates/LoginTemplate';
import groupApi from '@/api/groupApi';

function Login() {
  groupApi.agreeJoin();
  return <LoginTemplate rightComponent={LoginMain} />;
}

export default Login;
