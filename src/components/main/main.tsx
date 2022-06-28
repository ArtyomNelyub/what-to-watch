import FilmCard from '../film-card/film-card';
import SvgContainer from '../svg-container/svg-container';
import Footer from '../footer/footer';
import Preview from './preview';
import Genres from './genres';
import { mockFilms } from '../../mocks/mock-films';

export default function Main(): JSX.Element {
  return (
    <>
      <SvgContainer />

      <Preview {...mockFilms[0]} />

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <Genres />

          <div className='catalog__films-list'>
            {mockFilms.map((film) => (
              <FilmCard {...film} key={film.id} />
            ))}
          </div>

          <div className='catalog__more'>
            <button className='catalog__button' type='button'>
              Show more
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
