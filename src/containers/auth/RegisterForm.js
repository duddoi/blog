import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import { useEffect, useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form_register = useSelector((state) => {
    return state.auth.register;
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
    const { value, name } = e.target;
    dispatch(changeField({ form: 'register', key: name, value })); //object key/value 이름 같을 때 생략 가능
  }

  function onSubmit(e) {
    e.preventDefault();
    const { username, password, passwordConfirm } = form_register;
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력해 주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ username, password }));
  }

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      setError('회원가입 실패');
      console.log('!!register fail!!');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('!!register success!!');
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
      console.log(user);
    }
  }, [user, navigate]);

  return (
    <AuthForm
      type="register"
      form={form_register}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
