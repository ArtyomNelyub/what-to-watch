import SvgContainer from '../../UI/svg-container/svg-container';
import Footer from '../../UI/footer/footer';
import Preview from './preview';
import Preloader from '../../UI/preloader/preloader';
import { useAppSelector } from '../../../hooks';
import { useEffect } from 'react';
import {
  fetchFilms,
  fetchPromoFilm,
} from '../../../store/api-actions/api-actions-films';
import { store } from '../../../store';
import Catalog from './catalog';
import {
  getFilms,
  getIsFilmsLoaded,
  getPromoFilm,
} from '../../../store/data-process/selectors';

export default function Main(): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchPromoFilm());
    store.dispatch(fetchFilms());
  }, []);

  const films = useAppSelector(getFilms);
  const promoFilm = useAppSelector(getPromoFilm);
  const isFilmsLoaded = useAppSelector(getIsFilmsLoaded);

  if (!isFilmsLoaded || promoFilm === null) {
    return <Preloader />;
  }

  return (
    <>
      <SvgContainer />
      <Preview {...promoFilm} />
      <div className='page-content'>
        <Catalog films={films} />
        <Footer />
      </div>
    </>
  );
}
