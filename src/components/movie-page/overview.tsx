import { Film } from '../../types/film';

export default function Overview(props: Film): JSX.Element {
const {rating, scoresCount, description, director, starring} = props;

  function getWordRating(): string | null {
    switch (true) {
      case (rating >= 0 && rating < 3): 
        return 'Bad';
      case (rating >= 3 && rating < 5): 
        return 'Normal';
      case (rating >= 5 && rating < 8): 
        return 'Good';
      case (rating >= 8 && rating < 10): 
        return 'Very good';
      case (rating === 10): 
        return 'Awesome';
      default:
        return null;
    }
  }

  return (
    <>
      <div className='film-rating'>
        <div className='film-rating__score'>{rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>{getWordRating()}</span>
          <span className='film-rating__count'>{scoresCount} ratings</span>
        </p>
      </div>

      <div className='film-card__text'>
        <p>{description}</p>
        <p className='film-card__director'>
          <strong>Director: {director}</strong>
        </p>

        <p className='film-card__starring'>
          <strong>Starring: {starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}
