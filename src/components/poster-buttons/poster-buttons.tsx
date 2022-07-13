import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const/authorization-status';

type PosterButtonsProps = {
  id: string;
};

export default function PosterButtons(props: PosterButtonsProps): JSX.Element {
  const { id } = props;
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
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
          <Link
            to={AppRoute.MyList}
            className='btn btn--list film-card__button'
            type='button'
          >
            <svg viewBox='0 0 19 20' width='19' height='20'>
              <use xlinkHref='#add'></use>
            </svg>
            <span>My list</span>
          </Link>

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
