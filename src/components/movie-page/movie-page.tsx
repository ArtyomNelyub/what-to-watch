import SvgContainer from '../svg-container/svg-container';
import Footer from '../footer/footer';
import FilmCard from '../film-card/film-card';
import Overview from './overview';
import Details from './details';
import Reviews from './reviews';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import Preloader from '../preloader/preloader';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { store } from '../../store';
import { fetchComments, fetchCurrentFilm, fetchSimilarFilms } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import { changeSimilarFilmsStatus } from '../../store/action';
import PosterButtons from '../poster-buttons/poster-buttons';

type TabsState = {
  [k: string]: boolean;
};

const tabsPages: string[] = ['Overview', 'Details', 'Reviews'];

export default function MoviePage(): JSX.Element {
  const { id } = useParams();

  useEffect(() => {
    store.dispatch(changeSimilarFilmsStatus(false));
    store.dispatch(fetchSimilarFilms(id as string));
    store.dispatch(fetchComments(id as string));
    store.dispatch(fetchCurrentFilm(id as string));
  }, [id]);

  const film = useAppSelector((state) => state.currentFilm);
  const currentComments = useAppSelector((state)=>state.currentComments);
  const similarFilms = useAppSelector(state => state.similarFilms);
  const isSimilarFilmsLoaded = useAppSelector(state => state.isSimilarFilmsLoaded);
  const [activeTab, setActiveTab] = useState<TabsState>(setTab(tabsPages[0]));

  function setTab(active: string): TabsState {
    const tabsEntries = tabsPages.map((tab): [string, boolean] =>
      tab === active ? [tab, true] : [tab, false]
    );

    return Object.fromEntries(tabsEntries);
  }

  if (film === null || film.id.toString() !== id || !isSimilarFilmsLoaded) {
    return <Preloader />;
  }

  return (
    <>
      <SvgContainer />

      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header film-card__head'>
            <Logo />

            <UserBlock />
          </header>

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{film.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{film.genre}</span>
                <span className='film-card__year'>{film.released}</span>
              </p>

             <PosterButtons id={id}/>

            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img
                src={film.posterImage}
                alt={film.name}
                width='218'
                height='327'
              />
            </div>

            <div className='film-card__desc'>
              <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                  {tabsPages.map((tab) => (
                    <li
                      key={tab}
                      onClick={() => {
                        setActiveTab(setTab(tab));
                      }}
                      className={
                        activeTab[tab]
                          ? 'film-nav__item film-nav__item--active'
                          : 'film-nav__item'
                      }
                    >
                      <span
                        className='film-nav__link'
                        style={{ cursor: 'pointer' }}
                      >
                        {tab}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>

              {activeTab.Overview && <Overview {...film} />}
              {activeTab.Details && <Details {...film} />}
              {activeTab.Reviews && <Reviews comments={currentComments}/>}
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>

          <div className='catalog__films-list'>
            {similarFilms.map((film) => (
              film.id.toString() !== id && <FilmCard {...film} key={film.id} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
