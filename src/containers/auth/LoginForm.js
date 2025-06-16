import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import { useEffect, useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form_login = useSelector((state) => {
    return state.auth.login;
  });
  const auth = useSelector((state) => {
    return state.auth.auth;
  });
  const authError = useSelector((state) => {
    return state.auth.authError;
  });
  const user = useSelector((state) => {
    return state.user.user;
  });

  function onChange(e) {
    setError('');
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const { username, password } = form_login;
    dispatch(login({ username, password }));
  }
  // form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('error!!!!!!!!!:login fail');
      // console.log(authError);
      setError('로그인 실패임다');
      // throw '에러어어어ㅓ엉어ㅓㅇ';
      // dispatch(initializeForm('login'));
      // dispatch(changeField({ form: 'login', key: 'password', value: '' }));
      return;
    }
    if (auth) {
      console.log('SUCESS!!!!!!!!!::login');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working!');
      }
      console.log('check API SUCCESS!!');
      console.log(user.username);
    }
  }, [user, navigate]);

  return (
    <AuthForm
      type="login"
      form={form_login}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
