import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

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

const Msg = styled.div`
  color: #0007d9;
  text-align: center;
  font-size: 12px;
  margin-top: 6px;
  ${(props) =>
    props.$error &&
    css`
      color: red;
    `}
`;

const textMap = {
  login: 'LOG IN',
  register: 'REGISTER',
};
const secretKey = process.env.REACT_APP_SECRET_KEY;
const encrypted = (pw, token) => {
  // AES알고리즘 사용 암호화
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(pw), token).toString();
  // console.log('암호화', encrypted);
  return encrypted;
};

const decrypted = (hash, token) => {
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(hash, token);
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // console.log('복호화', decrypted);
  return decrypted;
};
export default function AuthForm({ type }) {
  const localStorageData = JSON.parse(localStorage.getItem('UserList'));
  const text = textMap[type];
  const [users, setUsers] = useState(
    localStorageData === null ? [] : localStorageData,
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (type === 'register') {
        const exist = users.find((user) => user.username === username);
        if (exist) {
          setMessage({
            type: 'error',
            text: '이미 존재하는 이름입니다. 다시 입력해 주세용.',
          });
          return;
        }
        if (password !== passwordConfirm) {
          setMessage({
            type: 'error',
            text: '비밀번호가 일치하지 않습니다.',
          });
          return;
        }
        if (password === '' || username === '' || passwordConfirm === '') {
          setMessage({
            type: 'error',
            text: '빈 칸을 입력해 주세요.',
          });
          return;
        }
        setUsers([
          ...users,
          {
            username: username,
            password: encrypted(password, secretKey),
            id: uuidv4(),
          },
        ]);

        setMessage({ type: 'success', text: '회원가입 성공!!' });
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
      } else if (type === 'login') {
        if (password === '' || username === '') {
          setMessage({
            type: 'error',
            text: '빈 칸을 입력해 주세요.',
          });
          return;
        }
        const exist = users.find((user) => user.username === username);
        if (exist && password) {
          if (password === decrypted(exist.password, secretKey)) {
            localStorage.setItem('User', JSON.stringify(username));
            navigate('/');
          } else {
            setMessage({
              type: 'error',
              text: '비밀번호가 틀렸습니다.',
            });
          }
        } else {
          setMessage({
            type: 'error',
            text: '존재하지 않는 사용자입니다.',
          });
          return;
        }
      }
    },
    [users, username, password, type, passwordConfirm, navigate],
  );
  useEffect(() => {
    localStorage.setItem('UserList', JSON.stringify(users));
  });
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          placeholder="input your id"
          autoComplete="username"
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <StyledInput
          placeholder="input your password"
          autoComplete="new-password"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        {type === 'register' && (
          <StyledInput
            placeholder="check your password"
            autoComplete="new-password"
            name="passwordConfirm"
            type="password"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            value={passwordConfirm}
          />
        )}
        {message.text && (
          <Msg $error={message.type === 'error'}>{message.text}</Msg>
        )}
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
