import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { AuthorizationStatus } from '../../const/authorization-status';


type RequireAuthProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

export default function RequireAuth(props: RequireAuthProps): JSX.Element {
  const { authorizationStatus, children } = props;

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return children;
  } else {
    return <Navigate to={AppRoute.SignIn} replace/>;
  }
}
