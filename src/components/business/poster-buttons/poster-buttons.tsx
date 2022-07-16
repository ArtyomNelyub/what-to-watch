import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { AuthorizationStatus } from '../../../const/authorization-status';
import { changeFavoriteStatus } from '../../../store/api-actions/api-actions-favorites';
import { memo } from 'react';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';

type PosterButtonsProps = {
  id: string;
  isFavorite: boolean;
  fromPromo: boolean;
};

const favoriteTrue = '1';
const favoriteFalse = '0';

function PosterButtons(props: PosterButtonsProps): JSX.Element {
  const { id, isFavorite, fromPromo } = props;
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <div className='film-card__buttons'>
      <Link
        to={`${AppRoute.Player}/${id}`}
        className='btn btn--play film-card__button'
        type='button'
      >
        <svg viewBox='0 0 19 19' width='19' height='19'>
          <use xlinkHref='#play-s'></use>
        </svg>
        <span>Play</span>
      </Link>

      {authorizationStatus === AuthorizationStatus.Auth && (
        <>
          {isFavorite ? (
            <button
            className='btn btn--list film-card__button'
            type='button'
            onClick={() => {
              dispatch(changeFavoriteStatus({ id, status: favoriteFalse, fromPromo }));
            }}
          >
            <svg viewBox='0 0 18 14' width='18' height='14'>
              <use xlinkHref='#in-list'></use>
            </svg>
            <span>My list</span>
          </button>
          ) : (
            <button
              className='btn btn--list film-card__button'
              type='button'
              onClick={() => {
                dispatch(changeFavoriteStatus({ id, status: favoriteTrue, fromPromo }));
              }}
            >
              <svg viewBox='0 0 19 20' width='19' height='20'>
                <use xlinkHref='#add'></use>
              </svg>
              <span>My list</span>
            </button>
            
          )}

          <Link
            to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`}
            className='btn film-card__button'
          >
            Add review
          </Link>
        </>
      )}
    </div>
  );
}

export default memo(PosterButtons);