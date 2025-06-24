import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const SubInfoBlock = styled.div`
  ${(props) =>
    props.$hasMargin &&
    css`
      margin-top: 8px;
    `}
  color: ${palette.gray[6]};
  font-size: 12px;
  line-height: 16px;
  span + span::before {
    content: '\\B7';
    color: ${palette.gray[5]};
    padding-left: 6px;
    padding-right: 6px;
  }
`;

export default function SubInfo({ username, hasMargin, publishedDate }) {
  return (
    <SubInfoBlock $hasMargin={hasMargin}>
      <span>{username}</span>
      <span>{publishedDate}</span>
    </SubInfoBlock>
  );
}
