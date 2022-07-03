import SvgContainer from '../svg-container/svg-container';
import BreadCrumbs from './bread-crumbs';
import Header from '../header/header';
import { mockFilms } from '../../mocks/mock-films';
import { STARS_VALUE } from '../../const/stars-value-list';
import React, { ChangeEvent, useState } from 'react';

const { posterImage, name, backgroundImage, id } = mockFilms[3];
const MAX_STAR_VALUE = '10';

export default function AddReview(): JSX.Element {
  const [activeStar, setActiveStar] = useState<string | null>(null);
  const [review, setReview] = useState<string | undefined>(undefined);

  function getStarValue(starValue: string): string {
    return starValue.slice(starValue.length - 1) === '0'
      ? MAX_STAR_VALUE
      : starValue.slice(starValue.length - 1);
  }
  
  function starHandler(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setActiveStar(value);
  }

  function textareaHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setReview(value);
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

          <Header children={<BreadCrumbs name={name} id={id} />} />

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
                        checked={activeStar === getStarValue(star)}
                      />
                      <label className='rating__label' htmlFor={star}>
                        Rating {getStarValue(star)}
                      </label>
                    </React.Fragment>
                  )
                )}
                
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
                <button className='add-review__btn' type='submit'>
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
