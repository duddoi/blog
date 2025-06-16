import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostView';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { delPost } from '../../lib/api/posts';
import AskModal from '../../components/common/AskModal';

export default function PostViewerContainer() {
  const [modal, setModal] = useState(false);
  const onModalClick = () => {
    setModal(false);
    navigate('/');
  };

  const post = useSelector((state) => {
    return state.post.post;
  });
  const error = useSelector((state) => {
    return state.post.error;
  });
  const user = useSelector(({ user }) => {
    return user.user;
  });
  const loading = useSelector((state) => {
    return state.loading['post/READ_POST'];
  });
  const { postId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const onDelete = async () => {
    try {
      const res = await delPost(postId);
      if (res) {
        setModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <>
      <PostViewer
        post={post}
        error={error}
        loading={loading}
        showWriteBtn={user}
        actionBtn={
          ownPost && <PostActionButtons onEdit={onEdit} onRemove={onDelete} />
        }
      />
      <AskModal
        visble={modal}
        onCancel={onModalClick}
        onConfirm={onModalClick}
        description="삭제되었습니다."
        confirmTxt="확인"
        type="confirm"
      />
    </>
  );
}
