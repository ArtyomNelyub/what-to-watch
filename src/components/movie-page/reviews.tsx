import { mockComments } from '../../mocks/mock-comments';
import { Comment } from '../../types/comment';

function Review(comment: Comment): JSX.Element {
  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{comment.comment}</p>

        <footer className='review__details'>
          <cite className='review__author'>{comment.user.name}</cite>
          <time className='review__date' dateTime={comment.date}>
            {comment.date}
          </time>
        </footer>
      </blockquote>

      <div className='review__rating'>{comment.rating}</div>
    </div>
  );
}

export default function Reviews(): JSX.Element {
  return (
    <div className='film-card__reviews film-card__row'>
      <div className='film-card__reviews-col'>
        {mockComments.map(
          (comment, index) => (index) % 2 === 0 && <Review {...comment} key={comment.id}/>
        )}
      </div>

      <div className='film-card__reviews-col'>
        {mockComments.map(
          (comment, index) => (index) % 2 !== 0 && <Review {...comment} key={comment.id}/>
        )}
      </div>
    </div>
  );
}
