import SvgContainer from '../svg-container/svg-container';
import Header from '../header/header';
import Footer from '../footer/footer';
import FilmCard from '../film-card/film-card';
import Overview from './overview';
import Details from './details';
import Reviews from './reviews';
import { mockFilms } from '../../mocks/mock-films';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { useState } from 'react';

type DescriptionState = {
  [key: string]: boolean;
};
const { backgroundImage, name, genre, released, posterImage, id } =
  mockFilms[2];

export default function MoviePage(): JSX.Element {
  const descriptionPages: string[] = ['Overview', 'Details', 'Reviews'];
  const [activeDescription, setDescription] = useState<DescriptionState>({
    Overview: true,
    Details: false,
    Reviews: false,
  });

  function setActiveDescription(active: string) {
    setDescription({
      Overview: false,
      Details: false,
      Reviews: false,
      [active]: true,
    });
  }

  return (
    <>
      <SvgContainer />

      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <Header />

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{genre}</span>
                <span className='film-card__year'>{released}</span>
              </p>

              <div className='film-card__buttons'>
                <Link
                  to={`${AppRoute.Player}/${id}`}
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
                <Link
                  to={`${AppRoute.Film}/1${AppRoute.AddReview}`}
                  className='btn film-card__button'
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img src={posterImage} alt={name} width='218' height='327' />
            </div>

            <div className='film-card__desc'>
              <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                  {descriptionPages.map((description) => (
                    <li
                      key={description}
                      onClick={() => {
                        setActiveDescription(description);
                      }}
                      className={
                        activeDescription[description]
                          ? 'film-nav__item film-nav__item--active'
                          : 'film-nav__item'
                      }
                    >
                      <a
                        href='#'
                        className='film-nav__link'
                        onClick={(e) => e.preventDefault()}
                      >
                        {description}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {activeDescription.Overview && <Overview {...mockFilms[2]} />}
              {activeDescription.Details && <Details {...mockFilms[2]} />}
              {activeDescription.Reviews && <Reviews />}
              
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>

          <div className='catalog__films-list'>
            {mockFilms.map((film) => (
              <FilmCard {...film} key={film.id} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
