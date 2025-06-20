import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useCallback, useEffect, useState } from 'react';
import AskModal from '../../components/common/AskModal.js';

export default function WriteActionButtonsContainer() {
  const navigate = useNavigate();
  const [modal, setModal] = useState({ desc: '', visible: false });

  const write = useSelector(({ write }) => {
    return write;
  });

  const localStorageData = JSON.parse(localStorage.getItem('PostList'));
  const [posts, setPosts] = useState(
    localStorageData === null ? [] : localStorageData,
  );

  const onPublish = () => {
    if (write.title === '') {
      setModal({ desc: '제목을 입력해 주세요!', visible: true });
      return;
    } else {
      setModal({ desc: '', visible: false });
    }

    if (write.originalPost) {
      const updatePost = posts.map((ps) => {
        if (ps._id === write.originalPost) {
          return {
            _id: write.originalPost,
            title: write.title,
            body: write.body,
            tags: write.tags,
            publishedDate: write.publishedDate,
            username: write.username,
          };
        } else {
          return ps;
        }
      });
      setPosts(updatePost);
      navigate(`/${write.originalPost}`);
    } else {
      setPosts([...posts, write]);
      navigate(`/${write._id}`);
    }
  };

  const onCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('PostList', JSON.stringify(posts));
  }, [posts]);

  return (
    <div>
      <WriteActionButtons
        onPublish={onPublish}
        onCancel={onCancel}
        isEdit={write.originalPost}
      />
      <AskModal
        visble={modal.visible}
        description={modal.desc}
        confirmTxt="확인"
        onCancel={() => setModal({ desc: '', visible: false })}
        onConfirm={() => setModal({ desc: '', visible: false })}
        type="confirm"
      />
    </div>
  );
}
