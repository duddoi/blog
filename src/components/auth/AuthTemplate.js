import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

// 회원가입/로그인 레이아웃

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 100%;
  height: 100%; */
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 20px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 20px;
  max-width: 320px;
  width: calc(100% - 40px);
  background: #fff;
  border-radius: 10px;
`;

export default function AuthTemplate({ children }) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">REACT-BLOG</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}
