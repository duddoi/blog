import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
`;

const PageNumber = styled.div``;

const buildLink = ({ page }) => {
  const query = qs.stringify({ page });
  return `?${query}`;
};

export default function Pagination({ page, lastPage }) {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={page === 1 ? undefined : buildLink({ page: page - 1 })}
      >
        이전
      </Button>
      <PageNumber>
        {page}/{lastPage}
      </PageNumber>
      <Button
        disabled={page === lastPage}
        to={page === lastPage ? undefined : buildLink({ page: page + 1 })}
      >
        다음
      </Button>
    </PaginationBlock>
  );
}
