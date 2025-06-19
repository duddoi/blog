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
  ${'' /* max-height: 32px; */}
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
      max-height: 42px;
      height: 42px;
      font-weight: 700;
      width: 100%;
    `}
  ${(props) =>
    props.$cyan &&
    css`
      background: ${palette.indigo[5]};
      transition: background 500ms;
      &:hover {
        background: ${palette.indigo[7]};
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
    </>
  );
}
