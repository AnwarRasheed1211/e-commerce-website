import { useState } from 'react';
import styles from '../../styles/product.module.css'; // Importing CSS module
import Link from 'next/link'; // Add this import statement

const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: '/product1.jpg' },
  { id: 2, name: 'Product 2', price: 29.99, image: '/product2.jpg' },
  { id: 3, name: 'Product 3', price: 39.99, image: '/product3.jpg' },
  { id: 4, name: 'Product 4', price: 49.99, image: '/product4.jpg' },
];

export default function Products() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product) => {
    setCartCount(cartCount + 1);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Browse Our Products</h1>
        <p>Cart Items: {cartCount}</p>
        {/* Navbar with Link to Home */}
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/">
                <div className={styles.navLink}>Home</div>
              </Link>
            </li>
            <li>
              <Link href={"/main/Product"}>
                <div className={styles.navLink}>Products</div>
              </Link>
            </li>
            <li>
              <Link href="#about">
                <div className={styles.navLink}>About</div>
              </Link>
            </li>
            <li>
              <Link href="#contact">
                <div className={styles.navLink}>Contact</div>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <div className={styles.cart}>Cart ({cartCount})</div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <button
              className={styles.addToCartButton}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 MyShop. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
