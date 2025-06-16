import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/write/Tagbox';
import { changeField } from '../../modules/write';

export default function TagBoxContainer() {
  const tags = useSelector((state) => {
    return state.write.tags;
  });

  const dispatch = useDispatch();
  const onChangeTags = (newTags) => {
    dispatch(changeField({ key: 'tags', val: newTags }));
  };

  return <TagBox tags={tags} onChangeTags={onChangeTags} />;
}
