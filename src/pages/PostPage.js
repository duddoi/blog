import React from 'react';
import Header from '../components/common/Header';
import PostViewer from '../components/post/PostView.js';
import { useParams } from 'react-router-dom';

export default function PostPage({ login, onLogOut }) {
  const localStorageData = JSON.parse(localStorage.getItem('PostList'));
  const { postId } = useParams();
  const post = localStorageData.find((dt) => postId === dt._id);
  return (
    <>
      <Header user={login} onLogOut={onLogOut} />
      <PostViewer post={post} />
    </>
  );
}
