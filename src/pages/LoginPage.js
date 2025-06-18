import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
// import LoginForm from '../containers/auth/LoginForm';
import AuthForm from '../components/auth/AuthForm';

export default function LoginPage() {
  return (
    <AuthTemplate>
      <Helmet>
        <title>LOG IN</title>
      </Helmet>
      <AuthForm type="login" />
    </AuthTemplate>
  );
}
