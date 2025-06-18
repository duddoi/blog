import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
// import RegisterForm from '../containers/auth/RegisterForm';
import AuthForm from '../components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <AuthTemplate>
      <Helmet>
        <title>REGISTER</title>
      </Helmet>
      <AuthForm type="register" />
    </AuthTemplate>
  );
}
