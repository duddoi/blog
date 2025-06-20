import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import PostViewer from '../components/post/PostView.js';
import { useNavigate, useParams } from 'react-router-dom';
import PostActionButtons from '../components/post/PostActionButtons.js';
import { useDispatch } from 'react-redux';
import { setOriginalPost } from '../modules/write.js';

export default function PostPage() {
  const localStorageData = JSON.parse(localStorage.getItem('PostList'));
  const localStorageUser = JSON.parse(localStorage.getItem('User'));

  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = localStorageData.find((dt) => postId === dt._id);

  const [postList, setPostList] = useState(localStorageData);

  const onDelete = () => {
    setPostList(postList.filter((ps) => postId !== ps._id));
    navigate('/');
  };
  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  useEffect(() => {
    localStorage.setItem('PostList', JSON.stringify(postList));
  }, [postList]);

  return (
    <>
      <Header
        actionBtn={
          localStorageUser === post.username && (
            <PostActionButtons onEdit={onEdit} onRemove={onDelete} />
          )
        }
      />
      <PostViewer post={post} />
    </>
  );
}
