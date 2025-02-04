import { useState } from 'react';
import styles from '../../styles/cart.module.css';

const AddToCart = ({ product }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.productImage}
      />
      <h2 className={styles.productName}>{product.name}</h2>
      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      <button
        className={styles.addToCartButton}
        onClick={addToCart}
      >
        Add to Cart
      </button>

      <div className={styles.cartCount}>
        Cart Items: {cartCount}
      </div>
    </div>
  );
};

export default AddToCart;
