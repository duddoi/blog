import { Helmet } from 'react-helmet-async';
import PostList from '../components/post/PostList';
import Pagination from '../components/post/Pagination';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Dropdown from '../components/common/Dropdown';
import { useState } from 'react';

function chunk(data = [], size = 1) {
  const arr = [];

  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size));
  }

  return arr;
}

const options = [
  { value: 5, label: '5개씩 보기' },
  { value: 10, label: '10개씩 보기' },
  { value: 20, label: '20개씩 보기' },
];

export default function PostListPage() {
  const localStorageData = JSON.parse(localStorage.getItem('PostList'));
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const tag = searchParams.get('tag');
  const posts = setPostList(localStorageData);
  const [select, setSelect] = useState(options[0]);

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
      <Header
        postsLen={posts.length}
        countPage={
          posts.length > 0 && (
            <Dropdown
              options={options}
              handleChange={(op) => {
                setSelect(op);
              }}
              hasBg={true}
            />
          )
        }
      />
      <PostList
        posts={chunk(posts, select.value)[page - 1]}
        noPost={posts.length === 0}
      />
      {posts.length > 0 && (
        <Pagination
          page={page}
          lastPage={Math.ceil(posts.length / select.value)}
          tag={tag}
        />
      )}
    </div>
  );
}
