import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import Logo from '../logo/logo';
import SvgContainer from '../svg-container/svg-container';

export default function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  function fieldChangeHandle(
    event: ChangeEvent<HTMLInputElement>,
    handler: (state: string) => void
  ) {
    const { value } = event.target;
    handler(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (userEmail !== '' && userPassword !== '') {
      dispatch(loginAction({ email: userEmail, password: userPassword }));
    }
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
