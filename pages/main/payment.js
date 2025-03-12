import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/payment.module.css';
import Navbar from '../../components/Navbar';

const PaymentPage = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
    setCheckoutItems(storedItems);
  }, []);

  const calculateTotal = () => {
    return checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePayment = () => {
    alert("Redirecting to payment gateway...");
    localStorage.removeItem('checkoutItems'); // Clear checkout items after payment
    router.push('/'); // Redirect to home after payment
  };

  const handleCancel = () => {
    const confirmCancel = confirm("Are you sure you want to cancel the payment?");
    if (confirmCancel) {
      localStorage.removeItem('checkoutItems'); // Clear checkout items
      setCheckoutItems([]); // Update state to reflect the removal
      router.push('/'); // Redirect to home
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.paymentContainer}>
        <h1>Payment Summary</h1>
        {checkoutItems.length > 0 ? (
          checkoutItems.map((product) => (
            <div key={product.id} className={styles.paymentItem}>
              <img src={product.image} alt={product.name} className={styles.paymentImage} />
              <div>
                <h2>{product.name}</h2>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ฿{(product.price * product.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items selected for payment.</p>
        )}

        <div className={styles.totalSection}>
          <h2>Total: <span>฿{calculateTotal()}</span></h2>
          <button className={styles.payButton} onClick={handlePayment}>Pay Now</button>
          <button className={styles.cancelButton} onClick={handleCancel}>Cancel Payment</button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
