import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

export default function Header(props: PropsWithChildren): JSX.Element {
  return (
    <header className='page-header film-card__head'>
      <div className='logo'>
        <Link to={AppRoute.Main} className='logo__link'>
          <span className='logo__letter logo__letter--1'>W</span>
          <span className='logo__letter logo__letter--2'>T</span>
          <span className='logo__letter logo__letter--3'>W</span>
        </Link>
      </div>

      {props.children}

      <ul className='user-block'>
        <Link to={AppRoute.MyList} className='user-block__item'>
          <div className='user-block__avatar'>
            <img
              src='img/avatar.jpg'
              alt='User avatar'
              width='63'
              height='63'
            />
          </div>
        </Link>
        <li className='user-block__item'>
          <Link to={AppRoute.SignIn} className='user-block__link'>
            Sign out
          </Link>
        </li>
      </ul>
    </header>
  );
}
