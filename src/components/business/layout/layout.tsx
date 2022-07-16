import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../../const/authorization-status';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { checkAuth } from '../../../store/api-actions/api-actions-user';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import Preloader from '../../UI/preloader/preloader';

export default function Layout(): JSX.Element {
  
  const authorizationStatus = useAppSelector(getAuthorizationStatus)
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(checkAuth())
  }, [dispatch])

  if (authorizationStatus === AuthorizationStatus.UNKNOWN) {
    return <Preloader />
  }

  return <Outlet />;
}