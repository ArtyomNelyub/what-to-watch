import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

interface FilmCardProps {
  imgSrc: string;
  filmName: string;
}

export default function FilmCard(props: FilmCardProps): JSX.Element {
  const { imgSrc, filmName } = props;
  return (
    <article className='small-film-card catalog__films-card'>
      <Link to={`${AppRoute.Film}/1`}>
        <div className='small-film-card__image'>
          <img src={imgSrc} alt={filmName} width='280' height='175' />
        </div>
      </Link>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`${AppRoute.Film}/1`}>
          {filmName}
        </Link>
      </h3>
    </article>
  );
}
