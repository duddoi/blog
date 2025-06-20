import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 32px;
  .blank {
    text-align: center;
    color: ${palette.gray[6]};
    font-size: 12px;
    line-height: 18px;
  }
`;

const PostItemBlock = styled.div`
  font-size: 12px;
  line-height: 16px;
  padding: 10px 0;
  &:first-child {
    padding-top: 0;
  }

  h2 {
    font-size: 16px;
    line-height: 24px;
    hyphens: auto;
    a {
      display: block;
      word-break: break-all;
    }
  }
  .text {
    background: ${palette.gray[1]};
    padding: 12px;
    border-radius: 8px;
    margin-top: 12px;
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
      <div className="text" dangerouslySetInnerHTML={{ __html: body }} />
    </PostItemBlock>
  );
}

export default function PostList({ posts, error, loading }) {
  return (
    <PostListBlock>
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
      {error && (
        <p className="blank">
          포스트가 없습니다. <br /> 로그인 후 포스트 등록이 가능합니다.
        </p>
      )}
    </PostListBlock>
  );
}
