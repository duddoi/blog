import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 32px;
`;
const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
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
  const { publishedDate, user, _id, title, tags, body } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={publishedDate}
        hasMargin="true"
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
}

export default function PostList({ posts, error, loading, showWriteBtn }) {
  if (error) {
    return <PostListBlock>오류가 발생하였습니다.</PostListBlock>;
  }
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteBtn && <Button to="/write">글 작성하기</Button>}
      </WritePostButtonWrapper>
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
}
