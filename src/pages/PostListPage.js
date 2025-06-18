import { Helmet } from 'react-helmet-async';
import PostList from '../components/post/PostList';
import Pagination from '../components/post/Pagination';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';

function chunk(data = [], size = 1) {
  const arr = [];

  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size));
  }

  return arr;
}

export default function PostListPage({ login, onLogOut }) {
  const localStorageData = JSON.parse(localStorage.getItem('PostList'));
  const posts = localStorageData === null ? [] : localStorageData;
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10) || 1;
  return (
    <div>
      <Helmet>
        <title>HOME</title>
      </Helmet>
      <Header user={login} onLogOut={onLogOut} />
      <PostList
        posts={chunk(posts, 5)[page - 1]}
        showWriteBtn={login !== ''}
        error={posts.length === 0}
      />
      {posts.length > 0 && (
        <Pagination
          page={page}
          // username={username}
          lastPage={Math.ceil(posts.length / 5)}
        />
      )}
    </div>
  );
}
