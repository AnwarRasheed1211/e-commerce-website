import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MyShop</div>
      <ul className={styles.navList}>
        <li>
          <Link href="/">
            <div className={styles.navLink}>Home</div>
          </Link>
        </li>
        <li>
          <Link href="/main/Product">
            <div className={styles.navLink}>Products</div>
          </Link>
        </li>
        <li>
          <Link href="/main/aboutus">
            <div className={styles.navLink}>About Us</div>
          </Link>
        </li>
        <li>
          <Link href="/main/contactus\">
          <div className={styles.navLink}>Contact</div>
          </Link>
        </li>
        <li>
          <Link href="/main/cart">
            <div className={styles.cart}>Cart ({cartCount})</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
