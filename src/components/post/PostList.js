import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 32px;
`;

const PostItemBlock = styled.div`
  font-size: 12px;
  padding: 20px 0;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[3]};
  }

  h2 {
    font-size: 16px;
    hyphens: auto;
  }
  p {
    margin-top: 20px;
  }
`;

export function PostItem({ post }) {
  const { publishedDate, _id, username, title, tags, body } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={username}
        publishedDate={publishedDate}
        hasMargin="true"
      />
      <Tags tags={tags} />
      <p dangerouslySetInnerHTML={{ __html: body }} />
    </PostItemBlock>
  );
}

export default function PostList({ posts, error, loading, showWriteBtn }) {
  return (
    <PostListBlock>
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
      {error && <p>포스트가 없습니다.</p>}
    </PostListBlock>
  );
}
