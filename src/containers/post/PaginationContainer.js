import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/post/Pagination';

export default function PaginationContainer() {
  const [searchParams] = useSearchParams();
  const { username } = useParams();
  const tag = searchParams.get('tag');
  const page = parseInt(searchParams.get('page'), 10) || 1;

  const lastPage = useSelector(({ list }) => {
    return list.lastPage;
  });
  const list = useSelector(({ list }) => {
    return list.posts;
  });
  const loading = useSelector(({ loading }) => {
    return loading['list/LIST_POST'];
  });

  if (!list || loading) return null;

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
}
