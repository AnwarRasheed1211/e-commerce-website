import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Update cart count from localStorage
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = storedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    // Get user session from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user session
    setUser(null);
    router.push("/"); // Redirect to home
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MyShop</div>
      <ul className={styles.navList}>
        <li><Link href="/"><div className={styles.navLink}>Home</div></Link></li>
        <li><Link href="/main/Product"><div className={styles.navLink}>Products</div></Link></li>
        <li><Link href="/main/aboutus"><div className={styles.navLink}>About Us</div></Link></li>
        <li><Link href="/main/contactus"><div className={styles.navLink}>Contact</div></Link></li>
        <li><Link href="/main/payment"><div className={styles.navLink}>Payment</div></Link></li>
        <li><Link href="/main/cart"><div className={styles.cart}>Cart ({cartCount})</div></Link></li>

        {/* Show Login/Logout based on authentication status */}
        {user ? (
          <li><button className={styles.navButton} onClick={handleLogout}>Logout</button></li>
        ) : (
          <li><Link href="/main/login"><div className={styles.navLink}>Login</div></Link></li>
        )}
      </ul>
    </nav>
  );
}
