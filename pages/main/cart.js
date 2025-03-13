import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import router for redirection
import styles from '../../styles/cart.module.css';
import Navbar from '../../components/Navbar';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateQuantity = (id, amount) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const toggleSelection = (id) => {
    if (selectedItems.some((item) => item.id === id)) {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    } else {
      const selectedItem = cart.find((item) => item.id === id);
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (!user) {
      setNotification("Please log in to proceed to checkout.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed to checkout.");
      return;
    }
    localStorage.setItem('checkoutItems', JSON.stringify(selectedItems)); // Store selected items
    router.push('/main/payment'); // Redirect to payment page
  };

  return (
    <>
      <Navbar />
      <div className={styles.cartContainer}>
        <h1>Your Cart</h1>
        {cart.length > 0 ? (
          cart.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedItems.some((item) => item.id === product.id)}
                onChange={() => toggleSelection(product.id)}
              />
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <div className={styles.productDetails}>
                <h2>{product.name}</h2>
                <p className={styles.originalPrice}>฿{(product.price * 1.2).toFixed(2)}</p>
                <p className={styles.discountedPrice}>฿{product.price.toFixed(2)}</p>
                {product.stock === 0 && <p className={styles.outOfStock}>Out of Stock</p>}
              </div>
              <div className={styles.quantitySelector}>
                <button onClick={() => updateQuantity(product.id, -1)} disabled={product.stock === 0}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => updateQuantity(product.id, 1)} disabled={product.stock === 0}>+</button>
              </div>
              <p className={styles.totalPrice}>฿{(product.price * product.quantity).toFixed(2)}</p>
              <button className={styles.removeButton} onClick={() => removeFromCart(product.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        <div className={styles.checkoutSection}>
          <p>Total: <span className={styles.totalAmount}>฿{calculateTotal()}</span></p>
          <button className={styles.checkoutButton} onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>

      {showNotification && (
        <div className={styles.notification}>
          {notification}
        </div>
      )}
    </>
  );
};

export default CartPage;