import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 20px;

  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 8px;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 236px;
  border: 1px solid ${palette.gray[9]};

  input,
  button {
    outline: none;
    border: none;
    font-size: 12px;
  }

  input {
    padding: 8px 12px;
    flex: 1;
    min-width: 0;
  }

  button {
    cursor: pointer;
    padding: 0 12px;
    background-color: ${palette.gray[8]};
    color: #fff;
    font-weight: bold;
    /* &:hover {
      background-color: ${palette.gray[6]};
    } */
  }
`;

const Tag = styled.div`
  margin-right: 10px;
  color: ${palette.gray[6]};
  cursor: pointer;
  font-size: 12px;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 12px;
`;

const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onDelelte }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} onRemove={onDelelte} />
    ))}
  </TagListBlock>
));

export default function TagBox({ tags, onChangeTags }) {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const ref = useRef(null);

  const insertTag = useCallback(
    (tag) => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      const newTags = [...localTags, tag];
      setLocalTags(newTags);
      onChangeTags(newTags);
    },
    [localTags, onChangeTags],
  );

  const onDelelte = useCallback(
    (tag) => {
      const newTags = localTags.filter((t) => t !== tag);
      setLocalTags(newTags);
      onChangeTags(newTags);
    },
    [localTags, onChangeTags],
  );

  const onInput = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
      ref.current.focus();
    },
    [input, insertTag],
  );

  useEffect(() => {
    setLocalTags(tags);
    onChangeTags(tags);
  }, [tags, onChangeTags]);

  return (
    <TagBoxBlock>
      <h4>TAG</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력하세요."
          onChange={onInput}
          value={input}
          ref={ref}
        />
        <button type="submit">ADD</button>
      </TagForm>
      <TagList tags={localTags} onDelelte={onDelelte} />
    </TagBoxBlock>
  );
}
