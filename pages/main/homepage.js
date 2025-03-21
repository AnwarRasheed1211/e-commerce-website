import { useState } from 'react';
import styles from '../styles/Home.module.css'; // Importing CSS module

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
    alert('Item added to cart!');
  };

  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>MyShop</div>
        <nav>
          <ul className={styles.navList}>
            <li><a href="#products" className={styles.navLink}>Products</a></li>
            <li><a href="#about" className={styles.navLink}>About</a></li>
            <li><a href="#contact" className={styles.navLink}>Contact</a></li>
            <li><a href="/cart" className={styles.cart}>Cart ({cartCount})</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Welcome to MyShop</h1>
        <p>Your one-stop shop for everything!</p>
        <button className={styles.button} onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
          Shop Now
        </button>
      </section>

      {/* Products Section */}
      <section id="products" className={styles.products}>
        <h2>Featured Products</h2>
        <div className={styles.productList}>
          {/* Product 1 */}
          <div className={styles.product}>
            <img src="/product1.jpg" alt="Product 1" className={styles.productImage} />
            <h3>Product 1</h3>
            <p>$19.99</p>
            <button className={styles.button} onClick={addToCart}>Add to Cart</button>
          </div>
          {/* Product 2 */}
          <div className={styles.product}>
            <img src="/product2.jpg" alt="Product 2" className={styles.productImage} />
            <h3>Product 2</h3>
            <p>$29.99</p>
            <button className={styles.button} onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 MyShop. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
