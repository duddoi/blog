import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../components/write/Editor';
import { useCallback, useEffect } from 'react';
import { changeField, initialize } from '../../modules/write';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../../lib/format';

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
    dispatch(
      changeField({
        key: 'username',
        val: JSON.parse(localStorage.getItem('User')),
      }),
    );
    dispatch(
      changeField({
        key: '_id',
        val: uuidv4(),
      }),
    );
    dispatch(
      changeField({
        key: 'publishedDate',
        val: formatDate(new Date()),
      }),
    );
    return () => {
      console.log('clearrrrrrrrrrr');
      dispatch(initialize());
    };
  }, [dispatch, originalPost]);

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
