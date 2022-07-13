import FilmCard from '../film-card/film-card';
import SvgContainer from '../svg-container/svg-container';
import Footer from '../footer/footer';
import Preview from './preview';
import Genres from './genres';
import Preloader from '../preloader/preloader';
import { useAppSelector } from '../../hooks';
import { ALL_GENRES } from '../../const/all-genres';
import { useEffect, useState } from 'react';
import { STEP_SHOWED_FILMS } from '../../const/step-showed-films';
import { fetchFilms } from '../../store/api-actions';
import { store } from '../../store';

export default function Main(): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchFilms());
  }, []);

  const films = useAppSelector((store) => store.films);
  const currentGenre = useAppSelector((store) => store.currentGenre);
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  const [showedCountFilms, setShowedCountFilms] =
    useState<number>(STEP_SHOWED_FILMS);

  const filteredFilms = films.filter((film) => {
    if (currentGenre === ALL_GENRES) {
      return true;
    }
    return film.genre === currentGenre;
  });

  const genres: string[] = Array.from(new Set(films.map((film) => film.genre)));

  function callBack(countFilms: number): void {
    setShowedCountFilms(countFilms);
  }

  if (!isDataLoaded) {
    return <Preloader />;
  }

  return (
    <>
      <SvgContainer />

      <Preview {...films[0]} />

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <Genres genres={genres} setDefaultShowedFilms={callBack} />

          <div className='catalog__films-list'>
            {filteredFilms.slice(0, showedCountFilms).map((film) => (
              <FilmCard {...film} key={film.id} />
            ))}
          </div>

          {showedCountFilms < filteredFilms.length && (
            <div className='catalog__more'>
              <button
                className='catalog__button'
                type='button'
                onClick={() =>
                  setShowedCountFilms((prev) => (prev += STEP_SHOWED_FILMS))
                }
              >
                Show more
              </button>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
