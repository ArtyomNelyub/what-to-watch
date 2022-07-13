import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { AuthorizationStatus } from '../../const/authorization-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserData } from '../../services/user-data';
import { logoutAction } from '../../store/api-actions';

function UnAuthorizedUser(): JSX.Element {
  return (
    <div className='user-block'>
      <Link to={AppRoute.SignIn} className='user-block__link'>
        Sign in
      </Link>
    </div>
  );
}

function AuthorizedUser(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = getUserData();

  return (
    <ul className='user-block'>
      <Link to={AppRoute.MyList} className='user-block__item'>
        <div className='user-block__avatar'>
          <img
            src={userData?.avatarUrl}
            alt={userData?.name}
            width='63'
            height='63'
          />
        </div>
      </Link>
      <li className='user-block__item'>
        <span
          className='user-block__link'
          style={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch(logoutAction());
          }}
        >
          Sign out
        </span>
      </li>
    </ul>
  );
}

export default function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <AuthorizedUser />
  ) : (
    <UnAuthorizedUser />
  );
}
