import styled from 'styled-components';
import Button from './Button';

const FullScreen = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AskModalBlock = styled.div`
  width: 280px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  &.confirm {
    width: 240px;
  }
  h2 {
    margin-top: 0;
    padding-bottom: 12px;
  }
  p {
    padding-bottom: 32px;
    font-size: 14px;
    text-align: center;
  }
  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    button {
      width: 50%;
    }
  }
`;

export default function AskModal({
  visble,
  title,
  description,
  cancelTxt = '취소',
  confirmTxt,
  onCancel,
  onConfirm,
  type,
}) {
  if (!visble) return null;
  return (
    <FullScreen>
      <AskModalBlock className={type === 'confirm' ? 'confirm' : ''}>
        {type !== 'confirm' && <h2>{title}</h2>}
        <p>{description}</p>
        <div className="buttons">
          <Button onClick={onCancel}>{cancelTxt}</Button>
          <Button
            colorCyan={type === 'confirm'}
            colorRed={type === 'delete'}
            onClick={onConfirm}
          >
            {confirmTxt}
          </Button>
        </div>
      </AskModalBlock>
    </FullScreen>
  );
}
