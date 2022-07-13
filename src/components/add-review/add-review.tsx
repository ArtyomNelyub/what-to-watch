import SvgContainer from '../svg-container/svg-container';
import BreadCrumbs from './bread-crumbs';
import { STARS_VALUE } from '../../const/stars-value-list';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchCurrentFilm, sendComment } from '../../store/api-actions';
import Preloader from '../preloader/preloader';

const MAX_STAR_VALUE = '10';

export default function AddReview(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector(state => state.currentFilm);
  const [activeStar, setActiveStar] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  useEffect(()=>{
    if (currentFilm && id === currentFilm.id.toString() ) {
      return
    } else {
      store.dispatch(fetchCurrentFilm(id as string))
    }
  }, [currentFilm, id])

  if (currentFilm === null || currentFilm.id.toString() !== id ) {
    return <Preloader />
  }

  const { posterImage, name, backgroundImage} = currentFilm;

  function getStarValue(starValue: string): string {
    return starValue.slice(starValue.length - 1) === '0'
      ? MAX_STAR_VALUE
      : starValue.slice(starValue.length - 1);
  }

  function starHandler(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setActiveStar(Number(value));
  }

  function textareaHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setReview(value);
  }

  function postHandler(event: SyntheticEvent) {
    console.log(event);
    event.preventDefault();
    dispatch(sendComment({
      comment : review,
      filmId : id as string,
      rating : activeStar,
    }))
  }

  return (
    <>
      <SvgContainer />

      <section className='film-card film-card--full'>
        <div className='film-card__header'>
          <div className='film-card__bg'>
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header'>
            <Logo />

            <BreadCrumbs id={id as string} name={name} />

            <UserBlock />
          </header>

          <div className='film-card__poster film-card__poster--small'>
            <img src={posterImage} alt={name} width='218' height='327' />
          </div>
        </div>

        <div className='add-review'>
          <form action='#' className='add-review__form'>
            <div className='rating'>
              <div className='rating__stars'>
                {STARS_VALUE.map((star) => (
                  <React.Fragment key={star}>
                    <input
                      className='rating__input'
                      id={star}
                      type='radio'
                      name='rating'
                      value={getStarValue(star)}
                      onChange={starHandler}
                      checked={activeStar.toString() === getStarValue(star)}
                    />
                    <label className='rating__label' htmlFor={star}>
                      Rating {getStarValue(star)}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className='add-review__text'>
              <textarea
                className='add-review__textarea'
                name='review-text'
                id='review-text'
                placeholder='Review text'
                onChange={textareaHandler}
                value={review}
              ></textarea>
              <div className='add-review__submit'>
                <button 
                  className='add-review__btn' 
                  type='submit'
                  onClick = {postHandler}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
