import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 52px;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 12px;
  font-size: 12px;
`;
const WritePostButtonWrapper = styled(Responsive)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
  padding: 24px 24px 0 0;
`;

export default function Header({ noWriteBtn }) {
  const localStorageData = JSON.parse(localStorage.getItem('User'));
  const [login, setLogin] = useState(localStorageData);
  const onLogOut = () => {
    setLogin('');
    localStorage.setItem('User', JSON.stringify(''));
  };
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            REACT-BLOG
          </Link>
          <div className="right">
            {login ? (
              <>
                <UserInfo>{login}</UserInfo>
                <Button className="small" colorCyan="true" onClick={onLogOut}>
                  로그아웃
                </Button>
              </>
            ) : (
              <Button colorCyan="true" to="/login">
                로그인
              </Button>
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
      <WritePostButtonWrapper>
        {login && !noWriteBtn && <Button to="/write">글 작성하기</Button>}
      </WritePostButtonWrapper>
    </>
  );
}
