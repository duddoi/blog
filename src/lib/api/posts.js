import client from './client';

export const addPost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) =>
  client.get('/api/posts', {
    params: { page, username, tag },
  });

export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, { title, body, tags });

export const delPost = (id) => client.delete(`/api/posts/${id}`);
