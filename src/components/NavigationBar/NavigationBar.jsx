import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './NavigationBar.module.css';
const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function NavigationBar() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.list}>
          <li>
            <NavLink to="/" className={getLinkStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getLinkStyles}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
console.log(getLinkStyles);
