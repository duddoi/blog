import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import Button from '../common/Button';
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
  margin-top: 40px;
`;
const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 32px;
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
  margin-top: 24px;
`;

export default function PostViewer({
  post,
  error,
  loading,
  showWriteBtn,
  actionBtn,
}) {
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
        <title>{title}000</title>
      </Helmet>
      <PostViewerBlock>
        <WritePostButtonWrapper>
          {showWriteBtn && <Button to="/write">글 작성하기</Button>}
        </WritePostButtonWrapper>
        <PostHead>
          <h1>{title}</h1>
          <SubInfo
            username={username}
            publishedDate={publishedDate}
            hasMargin="true"
          />
          <Tags tags={tags} />
        </PostHead>
        {actionBtn}
        <PostContent dangerouslySetInnerHTML={{ __html: body }} />
        {/* <PostContent>{body}</PostContent> */}
        {/** dangerouslySetInnerHTML html태그를 적용시켜 주는 p860 
      상세내용에서는 적용하되.. 리스트 페이지에서는 내용을 500자로 제한을 시켜놔서 내용이 잘리므로
      html태그를 적용하면 오류가 날 수 있다. 그래서 posts.ctrl.js(173)에서 모든 태그를 없애주는 작업을 하였지만
      특정 태그만 필터링(117)해서 데이터 등록이 가능하게 셋팅을 할 수 있다,, 이로써 악성코드 주입되는 것도 방지 할 수 있다.
      */}
      </PostViewerBlock>
    </>
  );
}
