import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';

type BreadCrumbsProps = {
  name: string;
  id: string;
}

function BreadCrumbs(props: BreadCrumbsProps): JSX.Element {
  const {name, id} = props;
  return (
    <nav className='breadcrumbs'>
      <ul className='breadcrumbs__list'>
        <li className='breadcrumbs__item'>
          <Link to={`${AppRoute.Film}/${id}`} className='breadcrumbs__link'>
            {name}
          </Link>
        </li>
        <li className='breadcrumbs__item'>
          <span className='breadcrumbs__link'>Add review</span>
        </li>
      </ul>
    </nav>
  );
}

export default memo(BreadCrumbs);
