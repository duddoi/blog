import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  background: ${palette.gray[8]};
  padding: 8px 12px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  max-height: 32px;
  cursor: pointer;

  &.small {
    font-size: 12px;
    padding: 6px;
  }
  &:hover {
    background: ${palette.gray[7]};
  }

  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }

  ${(props) =>
    props.$fullwidth &&
    css`
      height: 42px;
      font-weight: 700;
      width: 100%;
    `}
  ${(props) =>
    props.$cyan &&
    css`
      background: ${palette.cyan[5]};
      transition: background 500ms;
      &:hover {
        background: ${palette.cyan[7]};
      }
    `}
  ${(props) =>
    props.$warning &&
    css`
      background: ${palette.red[6]};
      transition: background 500ms;
      &:hover {
        background: ${palette.red[7]};
      }
    `}
`;
const StyleButton = styled.button`
  ${buttonStyle}
`;
const StyleLink = styled(Link)`
  ${buttonStyle}
`;

// Sample 컴포넌트가 부모 컴포넌트에서 styled를 통해 스타일을 부여한 것을 className으로 받아와야 적용이 된다.
// const Sample = ({ className, children }) => {
//   return <div className={className}>{children}</div>;
// };

// 컴포넌트 자체를 스타일링 한다.
// const StyleSample = styled(Sample)`
//   background: ${palette.cyan[3]};
// `;

/*
  !!!styled-components사용시 props 전달 받을 때!!!
  html태그를 스타일링 하여 만든 컴포넌트기에... DOM에서는 해당 props를 속성으로 여겨
  html태그의 표준 속성 외의 속성은 에러가 발생할 수 있다.
  하여 prefix를 사용한다.($로 구분)
*/
export default function Button({
  fullType,
  colorCyan,
  colorRed,
  children,
  className,
  onClick,
  to,
  disabled,
}) {
  return (
    <>
      {to ? (
        <StyleLink
          $fullwidth={fullType}
          $cyan={colorCyan}
          $warning={colorRed}
          className={className}
          to={to}
          disabled={disabled}
        >
          {children}
        </StyleLink>
      ) : (
        <StyleButton
          $fullwidth={fullType}
          $cyan={colorCyan}
          className={className}
          onClick={onClick}
          disabled={disabled}
          $warning={colorRed}
        >
          {children}
        </StyleButton>
      )}
      {/* <StyleSample>Button</StyleSample> */}
    </>
  );
}
