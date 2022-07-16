import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';
import { Film } from '../../../types/film';
import { DELAY } from '../../../const/delay-videoplayer';

export default function FilmCard(props: Film): JSX.Element {
  const { name, id, previewImage, previewVideoLink } = props;
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isReadyShowPlayer, setIsReadyShowPlayer] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReadyShowPlayer(true), DELAY);
    return () => {
      clearTimeout(timer);
      setIsReadyShowPlayer(false);
    };
  }, [activeCard]);

  return (
    <article
      className='small-film-card catalog__films-card'
      key={activeCard}
      onMouseEnter={() => {
        setActiveCard(id);
      }}
      onMouseLeave={() => {
        setActiveCard(null);
      }}
    >
      <Link to={`${AppRoute.Film}/${id}`}>
        <div className='small-film-card__image'>
          {activeCard === id && isReadyShowPlayer ? (
            <video
              muted
              autoPlay
              loop
              src={previewVideoLink}
              width='280'
              height='175'
              poster={previewImage}
            />
          ) : (
            <img src={previewImage} alt={name} width='280' height='175' />
          )}
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
