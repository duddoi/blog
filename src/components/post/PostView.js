import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
  padding-top: 12px;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 20px;
  margin-bottom: 24px;
  h1 {
    font-size: 24px;
    line-height: 1.2;
    margin: 0;
    hyphens: auto;
  }
`;

const PostContent = styled.div`
  font-size: 14px;
  color: ${palette.gray[8]};
  padding: 0 0 42px;
  word-break: break-all;
  p {
    margin: 0;
    & + & {
      margin-top: 12px;
    }
  }
`;

export default function PostViewer({ post, error, loading }) {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!!</PostViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, username, publishedDate, tags } = post;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PostViewerBlock>
        <PostHead>
          <h1>{title}</h1>
          <SubInfo
            username={username}
            publishedDate={publishedDate.slice(0, -3)}
            hasMargin="true"
          />
          <Tags tags={tags} />
        </PostHead>
        <PostContent dangerouslySetInnerHTML={{ __html: body }} />
      </PostViewerBlock>
    </>
  );
}
