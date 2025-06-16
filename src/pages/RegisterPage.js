import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthTemplate>
      <Helmet>
        <title>REGISTER</title>
      </Helmet>
      <RegisterForm />
    </AuthTemplate>
  );
}
