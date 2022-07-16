import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';
import { AuthorizationStatus } from '../../../const/authorization-status';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { redirectToRoute } from '../../../store/action';
import { loginAction } from '../../../store/api-actions/api-actions-user';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import Logo from '../../UI/logo/logo';
import SvgContainer from '../../UI/svg-container/svg-container';

export default function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const passwordRegExp = /((?=.*\d)(?=.*[a-zA-Z])).{2,}/g;
  const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,}/g;

  function fieldChangeHandle(
    event: ChangeEvent<HTMLInputElement>,
    handler: (state: string) => void
  ) {
    const { value } = event.target;
    handler(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (passwordRegExp.test(userPassword) && emailRegExp.test(userEmail)) {
      dispatch(loginAction({ email: userEmail, password: userPassword }));
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRoute(AppRoute.Main));
  }

  return (
    <>
      <SvgContainer />
      <div className='user-page'>
        <header className='page-header user-page__head'>
          <Logo />

          <h1 className='page-title user-page__title'>Sign in</h1>
        </header>

        <div className='sign-in user-page__content'>
          <form action='#' className='sign-in__form' onSubmit={handleSubmit}>
            {isError && (
              <div className='sign-in__message'>
                <p>
                  We can’t recognize this email <br /> and password combination.
                  Please try again. <br />
                  (Password should contains as less 1 number and 1 letter)
                </p>
              </div>
            )}
            <div className='sign-in__fields'>
              <div className='sign-in__field'>
                <input
                  className='sign-in__input'
                  type='email'
                  placeholder='Email address'
                  name='user-email'
                  id='user-email'
                  value={userEmail}
                  onChange={(event) => fieldChangeHandle(event, setUserEmail)}
                />
                <label
                  className='sign-in__label visually-hidden'
                  htmlFor='user-email'
                >
                  Email address
                </label>
              </div>
              <div className='sign-in__field'>
                <input
                  className='sign-in__input'
                  type='password'
                  placeholder='Password'
                  name='user-password'
                  id='user-password'
                  value={userPassword}
                  onChange={(event) =>
                    fieldChangeHandle(event, setUserPassword)
                  }
                />
                <label
                  className='sign-in__label visually-hidden'
                  htmlFor='user-password'
                >
                  Password
                </label>
              </div>
            </div>
            <div className='sign-in__submit'>
              <button className='sign-in__btn' type='submit'>
                Sign in
              </button>
            </div>
          </form>
        </div>

        <footer className='page-footer'>
          <div className='logo'>
            <Link to={AppRoute.Main} className='logo__link logo__link--light'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </Link>
          </div>

          <div className='copyright'>
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
