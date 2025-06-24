import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  background: ${palette.gray[7]};
  padding: 8px 12px;
  min-width: 60px;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: background 500ms;
  display: flex;
  justify-content: center;
  align-items: center;

  &.small {
    padding: 6px 12px;
  }
  &:hover {
    background: ${palette.gray[6]};
  }

  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }

  ${(props) =>
    props.$fullwidth &&
    css`
      max-height: 42px;
      height: 42px;
      font-weight: 700;
      width: 100%;
      font-size: 14px;
    `}
  ${(props) =>
    props.$mainColor &&
    css`
      background: ${palette.teal[7]};
      &:hover {
        background: ${palette.teal[6]};
      }
    `}
  ${(props) =>
    props.$subColor &&
    css`
      background: ${palette.indigo[6]};
      &:hover {
        background: ${palette.indigo[7]};
      }
    `}
  ${(props) =>
    props.$warning &&
    css`
      background: ${palette.red[6]};
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

export default function Button({
  fullType,
  mainColor,
  subColor,
  warning,
  children,
  className,
  onClick,
  to,
  disabled,
  style,
}) {
  return (
    <>
      {to ? (
        <StyleLink
          $fullwidth={fullType}
          $mainColor={mainColor}
          $subColor={subColor}
          $warning={warning}
          className={className}
          style={style}
          to={to}
          disabled={disabled}
        >
          {children}
        </StyleLink>
      ) : (
        <StyleButton
          $fullwidth={fullType}
          $mainColor={mainColor}
          $subColor={subColor}
          $warning={warning}
          className={className}
          style={style}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </StyleButton>
      )}
    </>
  );
}
