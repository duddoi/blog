import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const SubInfoBlock = styled.div`
  ${(props) =>
    props.$hasMargin &&
    css`
      margin-top: 12px;
    `}
  color: ${palette.gray[5]};
  font-size: 14px;
  span + span::before {
    content: '\\B7';
    color: ${palette.gray[5]};
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export default function SubInfo({ username, hasMargin, publishedDate }) {
  return (
    <SubInfoBlock $hasMargin={hasMargin}>
      <span>{username}</span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
}
