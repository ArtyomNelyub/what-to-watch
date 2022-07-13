import SvgContainer from '../svg-container/svg-container';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { useEffect, useRef, useState } from 'react';
import { store } from '../../store';
import { fetchCurrentFilm } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import Preloader from '../preloader/preloader';

export default function Player(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentFilm = useAppSelector(state => state.currentFilm);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
 
  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  useEffect(()=>{
    if (currentFilm?.id.toString() !== id as string) {
      store.dispatch(fetchCurrentFilm(id as string));
    }
  }, [currentFilm?.id, id]);

  if (currentFilm === null || currentFilm.id.toString() !== id as string) {
    return <Preloader />
  }

  const { backgroundImage, videoLink, runTime, name } = currentFilm;

  return (
    <>
      <SvgContainer />

      <div className='player'>
        <video
          ref={videoRef}
          src={videoLink}
          className='player__video'
          poster={backgroundImage}
        ></video>

        <button
          type='button'
          className='player__exit'
          onClick={() => navigate(`${AppRoute.Film}/${id}`)}
        >
          Exit
        </button>

        <div className='player__controls'>
          <div className='player__controls-row'>
            <div className='player__time'>
              <progress
                className='player__progress'
                value='30'
                max='100'
              ></progress>
              <div className='player__toggler' style={{ left: '30%' }}>
                Toggler
              </div>
            </div>
            <div className='player__time-value'>{runTime}</div>
          </div>

          <div className='player__controls-row'>
            <button 
              type='button' 
              className='player__play'
              onClick={() => setIsPlaying(!isPlaying)}  
            >
              <svg viewBox='0 0 19 19' width='19' height='19'>
                <use xlinkHref='#play-s'></use>
              </svg>
              <span>Play</span>
            </button>
            <div className='player__name'>{name}</div>

            <button type='button' className='player__full-screen'>
              <svg viewBox='0 0 27 27' width='27' height='27'>
                <use xlinkHref='#full-screen'></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
