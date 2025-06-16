import { useState } from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export default function PostActionButtons({ onEdit, onRemove }) {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <PostActionButtonBlock>
        <Button colorCyan="true" onClick={onEdit}>
          MODIFY
        </Button>
        <Button onClick={onRemoveClick} colorRed="true">
          DELETE
        </Button>
      </PostActionButtonBlock>
      <AskRemoveModal
        visble={modal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  );
}
