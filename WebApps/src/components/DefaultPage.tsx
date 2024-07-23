import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DefaultPage = () => {
  let menuItem = useSelector((state: any) => state.auth.menuItem);
  return <Navigate to={menuItem[0].path || '/'} />
};

export default DefaultPage;
