import { GENRES_LIST } from '../../const/genres-list';

export default function Genres(): JSX.Element {
  return (
    <ul className='catalog__genres-list'>
      {GENRES_LIST.map((genre) => (
        <li
          className={
            genre !== 'All genres'
              ? 'catalog__genres-item'
              : 'catalog__genres-item catalog__genres-item--active'
          }
          key={genre}
        >
          <a href='#' className='catalog__genres-link'>
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}
