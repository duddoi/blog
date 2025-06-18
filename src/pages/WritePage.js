import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorCantainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';
import Header from '../components/common/Header';

export default function WritePage({ login, onLogOut }) {
  return (
    <>
      <Helmet>
        <title>Write a POST</title>
      </Helmet>
      <Header user={login} onLogOut={onLogOut} />
      <Responsive>
        <EditorContainer />
        <TagBoxContainer />
        <WriteActionButtonsContainer />
      </Responsive>
    </>
  );
}
