import AskModal from '../common/AskModal';

export default function AskRemoveModal({ visble, onCancel, onConfirm }) {
  return (
    <AskModal
      visble={visble}
      onCancel={onCancel}
      onConfirm={onConfirm}
      description="포스트 삭제하시겠습니까?"
      confirmTxt="삭제"
      type="delete"
    />
  );
}
