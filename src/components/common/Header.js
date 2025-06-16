import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

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
    font-size: 12px;
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

export default function Header({ user, onLogOut }) {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            REACTTTTTTT
          </Link>
          <div className="right">
            {user ? (
              <>
                <UserInfo>{user.username}</UserInfo>
                <Button className="small" colorCyan="true" onClick={onLogOut}>
                  LOG OUT
                </Button>
              </>
            ) : (
              <Button colorCyan="true" to="/login">
                LOG IN
              </Button>
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}
