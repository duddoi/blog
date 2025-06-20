import styled from 'styled-components';
import Button from '../common/Button';

const WirteActionButtonsBlock = styled.div`
  padding: 24px 0 42px;
  display: flex;
  gap: 12px;
`;

export default function WriteActionButtons({ onPublish, onCancel, isEdit }) {
  return (
    <>
      <WirteActionButtonsBlock>
        <Button mainColor={true} onClick={onPublish}>
          포스트 {isEdit ? '수정' : '등록'}
        </Button>
        <Button onClick={onCancel}>취소</Button>
      </WirteActionButtonsBlock>
    </>
  );
}
