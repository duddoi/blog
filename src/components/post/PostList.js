import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useState } from 'react';
import { formatDate } from '../../lib/format';
import Dropdown from '../common/Dropdown';
import { useSelector } from 'react-redux';

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
`;
const Content = styled.div`
  background: ${palette.gray[1]};
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
  max-height: 160px;
  .text {
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-all;
    line-clamp: 5;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    p {
      margin: 0;
      & + & {
        margin-top: 12px;
      }
    }
  }
`;

const SetDataBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  gap: 12px;
  button {
    min-height: 38px;
  }
`;
const options = [
  { value: 10, label: '10개' },
  { value: 20, label: '20개' },
  { value: 30, label: '30개' },
  { value: 50, label: '50개' },
];

export function PostItem({ post }) {
  const { publishedDate, _id, username, title, tags, body } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={username}
        publishedDate={publishedDate.slice(0, -3)}
        hasMargin="true"
      />
      <Tags tags={tags} />
      <Content>
        <div className="text" dangerouslySetInnerHTML={{ __html: body }} />
      </Content>
    </PostItemBlock>
  );
}
export default function PostList({ posts, noPost, loading }) {
  const [select, setSelect] = useState(options[0]);
  const navigate = useNavigate();
  const username = useSelector(({ auth }) => {
    return auth.auth;
  });

  function onCreateFakeData(quantity) {
    const arr = [];
    for (let i = 1; i <= quantity; i++) {
      arr.push({
        _id: JSON.stringify(i),
        title: `test title ${i}`,
        tags: ['react', `test${i <= 10 ? ' filter' : i}`],
        body: `test body ${i}`,
        publishedDate: formatDate(new Date()),
        username: username,
        originalPost: null,
      });
    }
    localStorage.setItem('PostList', JSON.stringify(arr));
    navigate('/');
  }
  return (
    <PostListBlock>
      {!loading &&
        posts &&
        posts.map((post) => <PostItem post={post} key={post._id} />)}

      {noPost && (
        <div className="blank">
          포스트가 없습니다.
          <br />
          {username ? (
            <>
              'ADD NEW'를 눌러 포스트를 등록해 보세요!
              <SetDataBlock>
                <Dropdown
                  options={options}
                  handleChange={(op) => {
                    setSelect(op);
                  }}
                />
                <Button
                  subColor={true}
                  onClick={() => onCreateFakeData(select.value)}
                >
                  {select.label} fakeData 생성
                </Button>
              </SetDataBlock>
            </>
          ) : (
            '로그인 후 포스트 등록이 가능합니다.'
          )}
        </div>
      )}
    </PostListBlock>
  );
}
