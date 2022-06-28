import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { Film } from '../../types/film';

export default function FilmCard(props: Film): JSX.Element {
  const [, setActiveCard] = useState<number | null>();
  const { name, id, previewImage } = props;

  return (
    <article
      className='small-film-card catalog__films-card'
      onMouseEnter={() => setActiveCard(id)}
      onMouseLeave={() => setActiveCard(null)}
    >
      <Link to={`${AppRoute.Film}/${id}`}>
        <div className='small-film-card__image'>
          <img src={previewImage} alt={name} width='280' height='175' />
        </div>
      </Link>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`${AppRoute.Film}/${id}`}>
          {name}
        </Link>
      </h3>
    </article>
  );
}
