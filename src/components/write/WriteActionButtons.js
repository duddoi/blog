import styled from 'styled-components';
import Button from '../common/Button';

const WirteActionButtonsBlock = styled.div`
  margin-top: 24px;
  padding-bottom: 32px;
`;
const StyledButton = styled(Button)`
  height: 32px;
  & + & {
    margin-left: 12px;
  }
`;

export default function WriteActionButtons({ onPublish, onCancel }) {
  return (
    <>
      <WirteActionButtonsBlock>
        <StyledButton colorCyan="true" onClick={onPublish}>
          포스트 등록
        </StyledButton>
        <StyledButton onClick={onCancel}>취소</StyledButton>
      </WirteActionButtonsBlock>
    </>
  );
}
