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

export default function WriteActionButtons({ onPublish, onCancel, isEdit }) {
  return (
    <>
      <WirteActionButtonsBlock>
        <StyledButton mainColor={true} onClick={onPublish}>
          포스트 {isEdit ? '수정' : '등록'}
        </StyledButton>
        <StyledButton onClick={onCancel}>취소</StyledButton>
      </WirteActionButtonsBlock>
    </>
  );
}
