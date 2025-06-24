import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const PaginationBlock = styled(Responsive)`
  max-width: 280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px 42px;
  .now-page {
    color: ${palette.teal[9]};
    font-weight: bold;
  }
  .total-page {
    color: ${palette.gray[6]};
  }
`;

const PageNumber = styled.div``;

const buildLink = ({ tag, page }) => {
  const query = qs.stringify({ tag, page });
  return `?${query}`;
};

export default function Pagination({ page, lastPage, tag }) {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={page === 1 ? undefined : buildLink({ tag, page: page - 1 })}
      >
        이전
      </Button>
      <PageNumber>
        <span className="now-page">{page}</span>
        <span className="total-page"> / {lastPage}</span>
      </PageNumber>
      <Button
        disabled={page === lastPage}
        to={page === lastPage ? undefined : buildLink({ tag, page: page + 1 })}
      >
        다음
      </Button>
    </PaginationBlock>
  );
}
