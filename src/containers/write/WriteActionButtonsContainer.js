import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../../lib/format.js';
import { changeField } from '../../modules/write';
import AskModal from '../../components/common/AskModal.js';

export default function WriteActionButtonsContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const write = useSelector(({ write }) => {
    return write;
  });

  const localStorageData = JSON.parse(localStorage.getItem('PostList'));
  const [posts, setPosts] = useState(
    localStorageData === null ? [] : localStorageData,
  );
  const onPublish = () => {
    if (write.title === '') {
      setModal(true);
      return;
    } else {
      setModal(false);
    }
    setPosts([...posts, write]);
    navigate(`/${write._id}`);
  };

  const onCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(
      changeField({
        key: 'username',
        val: JSON.parse(localStorage.getItem('User')),
      }),
    );
    dispatch(
      changeField({
        key: '_id',
        val: uuidv4(),
      }),
    );
    dispatch(
      changeField({
        key: 'publishedDate',
        val: formatDate(new Date()),
      }),
    );
    localStorage.setItem('PostList', JSON.stringify(posts));
  }, [posts, dispatch]);

  return (
    <div>
      <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />
      <AskModal
        visble={modal}
        description="제목을 입력해주세요"
        confirmTxt="확인"
        onCancel={() => setModal(false)}
        onConfirm={() => setModal(false)}
      />
    </div>
  );
}
