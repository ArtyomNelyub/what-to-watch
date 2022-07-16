import {useAppSelector} from '../../../hooks';
import { getError } from '../../../store/app-process/selectors';

export default function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          padding: '10px',
          backgroundColor: '#d96666',
          color: 'white',
          borderRadius: '5px',
          zIndex: '9999999999',
        }}
      >
        {error}
      </div>
    );
  }

  return null;
}
