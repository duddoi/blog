import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

export default function HeaderContainer() {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogOut={onLogOut} />;
}
