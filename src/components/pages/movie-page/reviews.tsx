import { memo } from 'react';
import { Comment } from '../../../types/comment';

function Review(comment: Comment): JSX.Element {
  function dateFormatter(date: string, toHTML: boolean): string {
    if (toHTML) {
      const formatDateIntoComment = new Date(date)
        .toLocaleDateString('en-US', {
          timeZone: 'UTC',
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })
        .split('/');
      return `${formatDateIntoComment[2]}-${formatDateIntoComment[0]}-${formatDateIntoComment[1]}`;
    } else {
      const formatDateIntoHTML = new Date(date)
        .toLocaleDateString('en-US', {
          timeZone: 'UTC',
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })
        .split(' ');
      return `${formatDateIntoHTML[0]} ${formatDateIntoHTML[1]} ${formatDateIntoHTML[2]}`;
    }
  }

  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{comment.comment}</p>

        <footer className='review__details'>
          <cite className='review__author'>{comment.user.name}</cite>
          <time
            className='review__date'
            dateTime={dateFormatter(comment.date, true)}
          >
            {dateFormatter(comment.date, false)}
          </time>
        </footer>
      </blockquote>

      <div className='review__rating'>{comment.rating}</div>
    </div>
  );
}

type ReviewsProps = {
  comments: Comment[];
};

function Reviews({ comments }: ReviewsProps): JSX.Element {
  return (
    <div className='film-card__reviews film-card__row'>
      <div className='film-card__reviews-col'>
        {comments.map(
          (comment, index) =>
            index % 2 === 0 && <Review {...comment} key={comment.id} />
        )}
      </div>

      <div className='film-card__reviews-col'>
        {comments.map(
          (comment, index) =>
            index % 2 !== 0 && <Review {...comment} key={comment.id} />
        )}
      </div>
    </div>
  );
}

export default memo(Reviews);
