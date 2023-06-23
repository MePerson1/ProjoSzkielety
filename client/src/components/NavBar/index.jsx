import styles from "./styles.module.css";
import { Navigate, Link, NavLink } from "react-router-dom";
const NavBar = ({ token, handleLogout }) => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img className={styles.logo} src="logo.png" alt="logo" />
      </Link>
      <Link to="/" className={styles.white_btn}>
        Przepisy
      </Link>
      {token && (
        <Link to="yours" className={styles.white_btn}>
          Twoje przepisy
        </Link>
      )}
      {token && (
        <Link to="form" className={styles.white_btn}>
          Dodaj przepis
        </Link>
      )}
      {token && <Link className={styles.white_btn}>Konto</Link>}
      {!token && (
        <Link to="login" className={styles.white_btn}>
          Zaloguj
        </Link>
      )}
      {!token && (
        <Link to="signup" className={styles.white_btn}>
          Zarejestruj
        </Link>
      )}
      {token && (
        <button className={styles.white_btn} onClick={handleLogout}>
          Wyloguj
        </button>
      )}
    </nav>
  );
};

export default NavBar;
