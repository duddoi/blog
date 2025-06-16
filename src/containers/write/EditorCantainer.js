import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../components/write/Editor';
import { useCallback, useEffect } from 'react';
import { changeField, initialize } from '../../modules/write';

export default function EditorContainer() {
  const title = useSelector((state) => {
    return state.write.title;
  });
  const body = useSelector((state) => {
    return state.write.body;
  });

  const originalPost = useSelector(({ write }) => {
    return write.originalPost;
  });

  const dispatch = useDispatch();
  const onChangeField = useCallback(
    (payload) => {
      dispatch(changeField(payload));
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <>
      <Editor
        onChangeField={onChangeField}
        title={title}
        body={body}
        originalPost={originalPost}
      />
    </>
  );
}
