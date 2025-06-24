import { Helmet } from 'react-helmet-async';
import PostList from '../components/post/PostList';
import Pagination from '../components/post/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';
import { formatDate } from '../lib/format';

function chunk(data = [], size = 1) {
  const arr = [];

  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size));
  }

  return arr;
}

export default function PostListPage() {
  const localStorageData = JSON.parse(localStorage.getItem('PostList'));
  const localStorageUser = JSON.parse(localStorage.getItem('User'));
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const tag = searchParams.get('tag');
  const posts = setPostList(localStorageData);

  function onCreateFakeData(quantity) {
    const arr = [];
    for (let i = 1; i <= quantity; i++) {
      arr.push({
        _id: JSON.stringify(i),
        title: `test title ${i}`,
        tags: ['react', `test${i <= 10 ? ' filter' : i}`],
        body: `test body ${i}`,
        publishedDate: formatDate(new Date()),
        username: localStorageUser,
        originalPost: null,
      });
    }
    localStorage.setItem('PostList', JSON.stringify(arr));
    navigate('/');
  }

  function setPostList(list) {
    if (list === null) {
      return [];
    } else {
      let newPosts = [];
      if (tag) {
        for (let post of list) {
          if (post.tags.includes(tag)) {
            newPosts.push(post);
          }
        }
      } else {
        newPosts = list;
      }
      return newPosts.sort(
        (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate),
      );
    }
  }

  return (
    <div>
      <Helmet>
        <title>HOME</title>
      </Helmet>
      <Header />
      <PostList
        posts={chunk(posts, 5)[page - 1]}
        login={localStorageUser}
        postLen={posts.length === 0}
        onCreateFakeData={() => onCreateFakeData(20)}
      />
      {posts.length > 0 && (
        <Pagination
          page={page}
          lastPage={Math.ceil(posts.length / 5)}
          tag={tag}
        />
      )}
    </div>
  );
}
