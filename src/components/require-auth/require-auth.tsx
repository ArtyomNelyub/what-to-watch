import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { AuthorizationStatus } from '../../const/authorization-status';
import { useAppSelector } from '../../hooks';

type RequireAuthProps = {
  children: JSX.Element;
};

export default function RequireAuth(props: RequireAuthProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  const { children } = props;

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.SignIn} />
  );
}
