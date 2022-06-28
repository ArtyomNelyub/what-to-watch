import { Comment } from '../types/comment';

export const mockComments: Comment[] = [
  {
    id: 1,
    user: { id: 15, name: 'Kendall' },
    rating: 4.5,
    comment:
      'The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics. ',
    date: '2022-06-22T10:02:05.086Z',
  },
  {
    id: 2,
    user: { id: 11, name: 'Jack' },
    rating: 8,
    comment:
      "I really find it difficult to believe this movie is rated highly by people. It's hands down the worst movie I've seen in my life",
    date: '2022-06-17T10:02:05.086Z',
  },
  {
    id: 3,
    user: { id: 15, name: 'Kendall' },
    rating: 6.6,
    comment:
      'This movie really touched my heart, it really is the best movie of the year and everyone should see this masterpiece.',
    date: '2022-06-08T10:02:05.086Z',
  },
];
