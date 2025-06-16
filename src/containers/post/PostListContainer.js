import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { listPosts } from '../../modules/list';
import PostList from '../../components/post/PostList';

export default function PostListContainer() {
  const posts = useSelector(({ list }) => {
    return list.posts;
  });
  const error = useSelector(({ list }) => {
    return list.error;
  });
  const loading = useSelector(({ loading }) => {
    return loading['list/LIST_POST'];
  });
  const user = useSelector(({ user }) => {
    return user.user;
  });

  const { username } = useParams();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  useEffect(() => {
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(listPosts({ page, tag, username }));
  }, [dispatch, searchParams, username]);

  return (
    <PostList
      posts={posts}
      error={error}
      loading={loading}
      showWriteBtn={user}
    />
  );
}
