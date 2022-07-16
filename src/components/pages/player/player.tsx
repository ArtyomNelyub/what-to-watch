import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';
import { useEffect, useRef } from 'react';
import { store } from '../../../store';
import { fetchCurrentFilm } from '../../../store/api-actions/api-actions-films';
import { useAppSelector } from '../../../hooks';
import Preloader from '../../UI/preloader/preloader';
import { getCurrentFilm } from '../../../store/data-process/selectors';

export default function Player(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentFilm = useAppSelector(getCurrentFilm);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (currentFilm?.id.toString() !== (id as string)) {
      store.dispatch(fetchCurrentFilm(id as string));
    }
  }, [currentFilm?.id, id]);

  if (currentFilm === null || currentFilm.id.toString() !== (id as string)) {
    return <Preloader />;
  }

  const { backgroundImage, videoLink } = currentFilm;

  return (
    <>
      <div className='player'>
        <video
          controls
          ref={videoRef}
          src={videoLink}
          className='player__video'
          poster={backgroundImage}
          muted = {false}
        ></video>

         <button
          type='button'
          className='player__exit'
          onClick={() => navigate(`${AppRoute.Film}/${id}`)}
          style={{border: '2px solid #eee5b5'}}
        >
          Exit
        </button>
      </div>
    </>
  );
}
