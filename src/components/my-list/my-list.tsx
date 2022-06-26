import SvgContainer from '../svg-container/svg-container';
import FilmCard from '../film-card/film-card';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { mockFilmCard } from '../../mocks/film-card-mock';

export default function MyList(): JSX.Element {
  return (
    <>
      <SvgContainer />

      <div className='user-page'>
        <header className='page-header user-page__head'>
          <div className='logo'>
            <Link to={AppRoute.Main} className='logo__link'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </Link>
          </div>

          <h1 className='page-title user-page__title'>My list</h1>

          <ul className='user-block'>
            <li className='user-block__item'>
              <div className='user-block__avatar'>
                <img
                  src='../img/avatar.jpg'
                  alt='User avatar'
                  width='63'
                  height='63'
                />
              </div>
            </li>
            <li className='user-block__item'>
              <Link to={AppRoute.SignIn} className='user-block__link'>Sign out</Link>
            </li>
          </ul>
        </header>

        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <div className='catalog__films-list'>
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
