import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import AskModal from '../common/AskModal';
import { useDispatch } from 'react-redux';
import { loginStatus } from '../../modules/auth';

// 회원가입/로그인 폼

const AuthFormBlock = styled.div`
  h3 {
    font-size: 20px;
    text-align: center;
    color: ${palette.teal[5]};
  }
`;

const StyledInput = styled.input`
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 36px;
  color: ${palette.teal[8]};
  background-color: ${palette.teal[0]};
  border: 1px solid ${palette.teal[0]};
  border-radius: 4px;
  padding: 2px 12px;
  &:focus {
    border: 1px solid ${palette.teal[3]};
  }
  & + & {
    margin-top: 12px;
  }
  &::placeholder {
    font-size: 14px;
  }
  transition: 0.2s;
`;

const AuthButton = styled(Button)`
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
  color: ${palette.teal[9]};
  text-align: center;
  font-size: 12px;
  margin-top: 12px;
  ${(props) =>
    props.$error &&
    css`
      color: ${palette.red[9]};
    `}
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
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
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
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
      setModal(true);
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
          dispatch(loginStatus(username));
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
  };
  useEffect(() => {
    localStorage.setItem('UserList', JSON.stringify(users));
  }, [users]);
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          placeholder="이름을 입력해 주세요."
          autoComplete="username"
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <StyledInput
          placeholder="비밀번호를 입력해 주세요."
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
            placeholder="비밀번호를 다시 한번 입력해 주세요."
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
        <AuthButton fullType={true} mainColor={true}>
          {text}
        </AuthButton>
      </form>
      <Footer>
        {type === 'register' ? (
          <Link to="/login">로그인&gt;&gt;</Link>
        ) : (
          <Link to="/register">회원가입&gt;&gt;</Link>
        )}
      </Footer>
      <AskModal
        visble={modal}
        description="회원가입이 완료되었습니다.<br> 로그인하시겠습니까?"
        confirmTxt="로그인"
        onCancel={() => setModal(false)}
        onConfirm={() => navigate('/login')}
        type="confirm"
      />
    </AuthFormBlock>
  );
}
