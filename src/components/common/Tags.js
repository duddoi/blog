import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const TagsBlock = styled.div`
  margin-top: 8px;
  font-size: 12px;
  .tag {
    display: inline-block;
    color: ${palette.teal[7]};
    text-decoration: none;
    margin-right: 12px;
    &:hover {
      color: ${palette.teal[6]};
    }
  }
`;

export default function Tags({ tags }) {
  return (
    <TagsBlock>
      {tags.map((tag) => (
        <Link to={`/?tag=${tag}`} key={tag} className="tag">
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  );
}
