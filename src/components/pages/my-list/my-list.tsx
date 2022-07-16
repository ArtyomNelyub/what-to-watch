import SvgContainer from '../../UI/svg-container/svg-container';
import FilmCard from '../../UI/film-card/film-card';
import Footer from '../../UI/footer/footer';
import Logo from '../../UI/logo/logo';
import UserBlock from '../../business/user-block/user-block';
import { useAppSelector } from '../../../hooks';
import { useEffect } from 'react';
import { store } from '../../../store';
import { fetchFavorites } from '../../../store/api-actions/api-actions-favorites';
import Preloader from '../../UI/preloader/preloader';
import { getFavorites, getIsFavoritesLoaded } from '../../../store/data-process/selectors';

export default function MyList(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const isFavoritesLoaded = useAppSelector(getIsFavoritesLoaded);

  useEffect(() => {
    if (!isFavoritesLoaded) {
      store.dispatch(fetchFavorites());
    }
  }, [isFavoritesLoaded]);

  if (!isFavoritesLoaded) {
    return <Preloader />;
  }

  return (
    <>
      <SvgContainer />

      <div className='user-page'>
        <header className='page-header user-page__head'>
          <Logo />

          <h1 className='page-title user-page__title'>My list</h1>

          <UserBlock />
        </header>

        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <div className='catalog__films-list'>
            {favorites.map((film) => (
              <FilmCard {...film} key={film.id} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
