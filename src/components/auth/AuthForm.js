import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

// 회원가입/로그인 폼

const AuthFormBlock = styled.div`
  h3 {
    font-size: 20px;
    text-align: center;
    color: ${palette.cyan[5]};
  }
`;

const StyledInput = styled.input`
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 32px;
  border: 0;
  border-bottom: 1px solid ${palette.gray[5]};
  padding: 2px;
  &:focus {
    border-bottom-color: ${palette.cyan[8]};
  }
  & + & {
    margin-top: 6px;
  }
`;

const LoginButton = styled(Button)`
  margin-top: 24px;
`;

const Footer = styled.div`
  margin-top: 32px;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    font-size: 14px;
  }
`;

const ErrMsg = styled.div`
  color: red;
  text-align: center;
  font-size: 12px;
  margin-top: 6px;
`;

const textMap = {
  login: 'LOG IN',
  register: 'REGISTER',
};

export default function AuthForm({ type, form, onChange, onSubmit, error }) {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          placeholder="input your id"
          autoComplete="username"
          name="username"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          placeholder="input your password"
          autoComplete="new-password"
          name="password"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            placeholder="check your password"
            autoComplete="new-password"
            name="passwordConfirm"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrMsg>{error}</ErrMsg>}
        <LoginButton fullType="true" colorCyan="true">
          {text}
        </LoginButton>
      </form>
      <Footer>
        {type === 'register' ? (
          <Link to="/login">LOG IN</Link>
        ) : (
          <Link to="/register">REGISTER</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
}
