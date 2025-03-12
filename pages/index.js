import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { products } from "../lib/data";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    if (!user) {
      router.push("/main/login");
      return;
    }

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    if (!user) {
      router.push("/main/login");
      return;
    }

    localStorage.setItem('checkoutItems', JSON.stringify([{ ...product, quantity: 1 }]));
    router.push('/main/payment');
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar />
      <div>
        <section className={styles.hero}>
          <h1>Welcome to MyShop</h1>
          <p>Your one-stop shop for everything!</p>
          <button className={styles.button}>
            <Link href="/main/Product" className={styles.link}>
              Shop Now
            </Link>
          </button>
        </section>

        <section id="products" className={styles.products}>
          <h2>Featured Products ({products.length})</h2>
          <div className={styles.productList}>
            {products.map((product) => (
              <div key={product.id} className={styles.product}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
                <h3>{product.name}</h3>
                <p>฿{product.price.toFixed(2)}</p> 
                <p>Stock: {product.stock}</p> 
                <button
                  className={`${styles.button} ${product.stock === 0 ? styles.disabledButton : ''}`}
                  onClick={() => openModal(product)}
                  disabled={product.stock === 0}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <p>&copy; 2024 MyShop. All Rights Reserved.</p>
        </footer>
      </div>

      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.closeButton} onClick={closeModal}>&times;</span>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className={styles.modalImage}
            />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Price: ฿{selectedProduct.price.toFixed(2)}</p> {/* Updated price format */}
            <p>Stock: {selectedProduct.stock}</p> {/* Added stock information */}
            <div className={styles.modalActions}>
              <button
                className={`${styles.button} ${selectedProduct.stock === 0 ? styles.disabledButton : ''}`}
                onClick={() => addToCart(selectedProduct)}
                disabled={selectedProduct.stock === 0}
              >
                Add to Cart
              </button>
              <button
                className={`${styles.buyNowButton} ${selectedProduct.stock === 0 ? styles.disabledButton : ''}`}
                onClick={() => handleBuyNow(selectedProduct)}
                disabled={selectedProduct.stock === 0}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}