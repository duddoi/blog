import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

const EditorBlock = styled(Responsive)`
  padding: 50px 0 0;
`;

const TitleInput = styled.input`
  font-size: 18px;
  outline: none;
  padding-bottom: 8px;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 20px;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 14px;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0;
  }
`;

export default function Editor({ title, body, onChangeField }) {
  const quillEl = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    let ignore = quillInstance.current;
    if (!ignore) {
      quillInstance.current = new Quill(quillEl.current, {
        theme: 'bubble',
        placeholder: '내용을 작성하세요...',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'link', 'image'],
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ],
        },
      });

      quillInstance.current.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          onChangeField({
            key: 'body',
            val: quillInstance.current.root.innerHTML,
          });
        }
      });
    }
    onChangeField({ key: 'title', val: title });
  }, [onChangeField, title]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', val: e.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요..."
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillEl}></div>
      </QuillWrapper>
    </EditorBlock>
  );
}
