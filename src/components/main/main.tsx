import FilmCard from '../film-card/film-card';
import SvgContainer from '../svg-container/svg-container';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import { mockFilmCard } from '../../mocks/film-card-mock';
import { AppRoute } from '../../const/app-route';

interface MainProps {
  imgBGSrc: string;
  imgPosterSrc: string;
  filmName: string;
  filmGenre: string;
  filmReleased: number;
}

export default function Main(props: MainProps): JSX.Element {
  const { imgBGSrc, imgPosterSrc, filmName, filmGenre, filmReleased } = props;

  return (
    <>
      <SvgContainer />

      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={imgBGSrc} alt={filmName} />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header film-card__head'>
      <div className='logo'>
        <a className='logo__link'>
          <span className='logo__letter logo__letter--1'>W</span>
          <span className='logo__letter logo__letter--2'>T</span>
          <span className='logo__letter logo__letter--3'>W</span>
        </a>
      </div>
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

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img src={imgPosterSrc} alt={filmName} width='218' height='327' />
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{filmName}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{filmGenre}</span>
                <span className='film-card__year'>{filmReleased}</span>
              </p>

              <div className='film-card__buttons'>
                <Link 
                  to={`${AppRoute.Player}/1`}
                  className='btn btn--play film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button
                  className='btn btn--list film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 20' width='19' height='20'>
                    <use xlinkHref='#add'></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <ul className='catalog__genres-list'>
            <li className='catalog__genres-item catalog__genres-item--active'>
              <a href='#' className='catalog__genres-link'>
                All genres
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Comedies
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Crime
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Documentary
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Dramas
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Horror
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Kids & Family
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Romance
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Sci-Fi
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Thrillers
              </a>
            </li>
          </ul>

          <div className='catalog__films-list'>
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
            <FilmCard {...mockFilmCard} />
          </div>

          <div className='catalog__more'>
            <button className='catalog__button' type='button'>
              Show more
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
