import { useEffect } from 'react';
import { ALL_GENRES } from '../../const/all-genres';
import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks';
import { setGenre } from '../../store/action';
import { STEP_SHOWED_FILMS } from '../../const/step-showed-films';

type GenresProps = {
  genres: string[];
  setDefaultShowedFilms: (showedCountFilms:number) => void
}

export default function Genres({genres, setDefaultShowedFilms} : GenresProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(store=>store.currentGenre);
  const withAllGenres = [ALL_GENRES, ...genres];
  useEffect(()=>{
    dispatch(setGenre(ALL_GENRES));
  }, [dispatch])
  
  return (
    <ul className='catalog__genres-list'>
      {withAllGenres.map((genre) => (
        <li
          onClick={() => {
            dispatch(setGenre(genre))
            setDefaultShowedFilms(STEP_SHOWED_FILMS)
          }}
          className={
            genre !== currentGenre
              ? 'catalog__genres-item'
              : 'catalog__genres-item catalog__genres-item--active'
          }
          key={genre}
        >
          <span style={{cursor: 'pointer'}} className='catalog__genres-link'>
            {genre}
          </span>
        </li>
      ))}
    </ul>


  );
}
