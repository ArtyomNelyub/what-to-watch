import { memo, useEffect, useState } from 'react';
import { ALL_GENRES } from '../../../const/all-genres';
import { STEP_SHOWED_FILMS } from '../../../const/step-showed-films';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setGenre } from '../../../store/app-process/app-process';
import { getCurrentGenre } from '../../../store/app-process/selectors';
import { Film } from '../../../types/film';
import FilmCard from '../../UI/film-card/film-card';

type CatalogProps = {
  films: Film[];
};

function Catalog(props: CatalogProps): JSX.Element {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setGenre(ALL_GENRES));
  }, [dispatch]);
  
  const [showedCountFilms, setShowedCountFilms] =
    useState<number>(STEP_SHOWED_FILMS);
  const { films } = props;
  const genres: string[] = Array.from(new Set(films.map((film) => film.genre)));
  const withAllGenres = [ALL_GENRES, ...genres];
  const currentGenre = useAppSelector(getCurrentGenre);
  
  const filteredFilms = films.filter((film) => {
    if (currentGenre === ALL_GENRES) {
      return true;
    }
    return film.genre === currentGenre;
  });

  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>

      <ul className='catalog__genres-list'>
        {withAllGenres.map((genre) => (
          <li
            onClick={() => {
              dispatch(setGenre(genre));
              setShowedCountFilms(STEP_SHOWED_FILMS);
            }}
            className={
              genre !== currentGenre
                ? 'catalog__genres-item'
                : 'catalog__genres-item catalog__genres-item--active'
            }
            key={genre}
          >
            <span
              style={{ cursor: 'pointer' }}
              className='catalog__genres-link'
            >
              {genre}
            </span>
          </li>
        ))}
      </ul>

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
  );
}

export default memo(Catalog);