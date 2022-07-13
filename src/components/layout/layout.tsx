import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../const/authorization-status';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { checkAuth } from '../../store/api-actions';
import Preloader from '../preloader/preloader';

export default function Layout(): JSX.Element {
  const authorizationStatus = useAppSelector(state => state.authorizationStatus)
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(checkAuth())
  }, [dispatch])

  if (authorizationStatus === AuthorizationStatus.UNKNOWN) {
    return <Preloader />
  }

  return <Outlet />;
}