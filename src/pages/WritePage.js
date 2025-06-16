import Responsive from '../components/common/Responsive';
// import Editor from '../components/write/Editor';
// import TagBox from '../components/write/Tagbox';
// import WriteActionButtons from '../components/write/WriteActionButtons';
import EditorContainer from '../containers/write/EditorCantainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import { Helmet } from 'react-helmet-async';

export default function WritePage() {
  return (
    <>
      <Helmet>
        <title>Write a POST</title>
      </Helmet>
      <HeaderContainer />
      <Responsive>
        <EditorContainer />
        <TagBoxContainer />
        <WriteActionButtonsContainer />
      </Responsive>
    </>
  );
}
