import { Film } from '../../../types/film';
import Logo from '../../UI/logo/logo';
import UserBlock from '../../business/user-block/user-block';
import PosterButtons from '../../business/poster-buttons/poster-buttons';
import { memo } from 'react';

function Preview(props: Film): JSX.Element {
  const { backgroundImage, name, posterImage, genre, released, id, isFavorite } = props;

  return (
    <section className='film-card'>
      <div className='film-card__bg'>
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className='visually-hidden'>WTW</h1>

      <header className='page-header film-card__head'>
        <Logo />

        <UserBlock />
      </header>

      <div className='film-card__wrap'>
        <div className='film-card__info'>
          <div className='film-card__poster'>
            <img src={posterImage} alt={name} width='218' height='327' />
          </div>

          <div className='film-card__desc'>
            <h2 className='film-card__title'>{name}</h2>
            <p className='film-card__meta'>
              <span className='film-card__genre'>{genre}</span>
              <span className='film-card__year'>{released}</span>
            </p>

            <PosterButtons id={id.toString()} isFavorite={isFavorite} fromPromo={true}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Preview);