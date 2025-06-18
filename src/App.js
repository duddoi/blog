import './App.css';
import { Routes, Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import CSSModule from './components/CSSModule';
import { useState } from 'react';

function App() {
  const localStorageData = JSON.parse(localStorage.getItem('User'));
  const [login, setLogin] = useState(localStorageData);
  const onLogOut = () => {
    setLogin('');
    localStorage.setItem('User', JSON.stringify(''));
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<PostListPage onLogOut={onLogOut} login={login} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/write"
          element={<WritePage onLogOut={onLogOut} login={login} />}
        />
        <Route
          path=":postId"
          element={<PostPage onLogOut={onLogOut} login={login} />}
        />
        <Route path="/test" element={<CSSModule />} />
      </Routes>
    </>
  );
}

export default App;
