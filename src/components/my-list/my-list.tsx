import SvgContainer from '../svg-container/svg-container';
import FilmCard from '../film-card/film-card';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import { useAppSelector } from '../../hooks';

export default function MyList(): JSX.Element {
  const films = useAppSelector(state => state.films);
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
            {films.map((film) => (
              <FilmCard {...film} key={film.id} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
