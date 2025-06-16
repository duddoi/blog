// import PostList from '../components/post/PostList';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import PaginationContainer from '../containers/post/PaginationContainer';
import PostListContainer from '../containers/post/PostListContainer';

export default function PostListPage() {
  return (
    <div>
      <Helmet>
        <title>HOME</title>
      </Helmet>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </div>
  );
}
