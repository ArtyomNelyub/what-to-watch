import FilmCard from '../film-card/film-card';
import SvgContainer from '../svg-container/svg-container';
import Footer from '../footer/footer';
import Preview from './preview';
import Genres from './genres';
import { mockFilms } from '../../mocks/mock-films';
import { useAppSelector } from '../../hooks';
import { ALL_GENRES } from '../../const/genres-list';
import { useState } from 'react';
import { STEP_SHOWED_FILMS } from '../../const/step-showed-films';

export default function Main(): JSX.Element {
  const currentGenre = useAppSelector((store) => store.currentGenre);
  
  const [showedCountFilms, setShowedCountFilms] =
    useState<number>(STEP_SHOWED_FILMS);

  const filteredFilms = mockFilms.filter((film) => {
    if (currentGenre === ALL_GENRES) {
      return true;
    }
    return film.genre === currentGenre;
  });

  const genres: string[] = Array.from(
    new Set(mockFilms.map((film) => film.genre))
  );

  function callBack(countFilms: number): void {
    setShowedCountFilms(countFilms);
  }

  return (
    <>
      <SvgContainer />

      <Preview {...mockFilms[0]} />

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <Genres genres={genres} setDefaultShowedFilms={callBack}/>

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
