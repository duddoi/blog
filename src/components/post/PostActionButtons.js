import { useState } from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export default function PostActionButtons({ onEdit, onRemove }) {
  const [modal, setModal] = useState(false);

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
        <Button subColor={true} onClick={onEdit}>
          EDIT
        </Button>
        <Button onClick={() => setModal(true)} warning={true}>
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
