import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePost, writePost } from '../../modules/write';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useEffect } from 'react';

export default function WriteActionButtonsContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = useSelector(({ write }) => {
    return write.title;
  });
  const body = useSelector(({ write }) => {
    return write.body;
  });
  const tags = useSelector(({ write }) => {
    return write.tags;
  });
  const post = useSelector(({ write }) => {
    return write.post;
  });
  const postError = useSelector(({ write }) => {
    return write.postError;
  });

  const originalPost = useSelector(({ write }) => {
    return write.originalPost;
  });

  const onPublish = () => {
    if (originalPost) {
      dispatch(updatePost({ title, body, tags, id: originalPost }));
      return;
    }
    dispatch(writePost({ title, body, tags }));
  };

  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      navigate(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPost}
    />
  );
}
