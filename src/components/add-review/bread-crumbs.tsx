import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

type BreadCrumbsProps = {
  name: string;
  id: string;
}

export default function BreadCrumbs(props: BreadCrumbsProps): JSX.Element {
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
          <a className='breadcrumbs__link'>Add review</a>
        </li>
      </ul>
    </nav>
  );
}
