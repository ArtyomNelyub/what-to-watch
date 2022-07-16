import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';
import { AuthorizationStatus } from '../../../const/authorization-status';
import { useAppSelector } from '../../../hooks';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';

type RequireAuthProps = {
  children: JSX.Element;
};

export default function RequireAuth(props: RequireAuthProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const { children } = props;

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.SignIn} />
  );
}
