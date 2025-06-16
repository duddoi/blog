import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthTemplate>
      <Helmet>
        <title>LOG IN</title>
      </Helmet>
      <LoginForm />
    </AuthTemplate>
  );
}
