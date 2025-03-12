import { db, doc, getDoc } from "../../api/connecter"; // Ensure correct import
import styles from "../../../styles/productDetails.module.css";
import Navbar from "../../../components/Navbar";

export default function ProductDetail({ product }) {
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.productContainer}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
          <div className={styles.productInfo}>
            <h1>{product.name}</h1>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <button className={styles.buyButton}>Buy Now</button>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
    try {
      console.log("Fetching product with ID:", params.id); // Debugging
  
      const docRef = doc(db, "products", params.id);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.log("Product not found in Firestore.");
        return { notFound: true };
      }
  
      console.log("Product data fetched:", docSnap.data()); // Debugging
  
      return {
        props: {
          product: { id: docSnap.id, ...docSnap.data() },
        },
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      return { notFound: true };
    }
  }
  
