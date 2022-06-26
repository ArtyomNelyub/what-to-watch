import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

export default function NotFound(): JSX.Element {
  return (
    <>
      <div className='user-page'>
        <div
          className='sign-in user-page__content'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            rowGap: '20px',
          }}
        >
          <h1 className='page-title' style={{ fontSize: '78px' }}>
            404
          </h1>
          <p>Page not found!</p>
          <Link
            to={AppRoute.Main}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 15px',
              borderRadius: '15px',
              cursor: 'pointer',
              border: '3px solid rgb(217,202,116)',
              color: '#d9ca74',
              backgroundColor: '#3f1c1c',
              textDecoration: 'none',
            }}
          >
            Back to main page
          </Link>
        </div>
      </div>
    </>
  );
}
