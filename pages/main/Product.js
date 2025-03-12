import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { categories, products as defaultProducts } from '../../lib/data';
import styles from '../../styles/product.module.css';
import { useRouter } from 'next/router'; // Import router for redirection

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    stock: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    const storedProducts = JSON.parse(localStorage.getItem('products')) || defaultProducts;
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    setFilteredProducts(
      selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products
    );
  }, [products, selectedCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setNewProduct((prev) => ({ ...prev, image: imageURL }));
    }
  };

  const handleUpload = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.description || !newProduct.category || !newProduct.stock) {
      alert('Please fill in all fields');
      return;
    }
  
    const uploadedProduct = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
      description: newProduct.description,
      category: newProduct.category,
      stock: parseInt(newProduct.stock, 10),
    };
  
    const updatedProducts = [...products, uploadedProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  
    setNewProduct({ name: '', price: '', image: '', description: '', category: '', stock: '' });
    setImagePreview(null);
    setIsModalOpen(false);
    alert('Product uploaded successfully!');
  };

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = storedCart.findIndex((item) => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increase the quantity
      storedCart[existingProductIndex].quantity += 1;
    } else {
      // Product does not exist in the cart, add it with quantity 1
      storedCart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert(`Added ${product.name} to cart`);
  };

  const handleBuyNow = (product) => {
    localStorage.setItem('checkoutItems', JSON.stringify([{ ...product, quantity: 1 }]));
    router.push('/main/payment');
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Shop by Category</h1>

        {/* Category Selection */}
        <div className={styles.categoryContainer}>
          <button className={styles.categoryButton} onClick={() => setSelectedCategory(null)}>All</button>
          {categories.map((category) => (
            <button
              key={category.slug}  
              className={`฿{styles.categoryButton} ${selectedCategory === category.slug ? styles.activeCategory : ''}`}
              onClick={() => setSelectedCategory(category.slug)}  
            >
              {category.name}  
            </button>
          ))}
        </div>

        {/* Admin Upload Button */}
        {user?.isAdmin && (
          <button className={styles.uploadButton} onClick={() => setIsModalOpen(true)}>
            Upload New Product
          </button>
        )}

        {/* Product Grid */}
        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard} onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}>Price: ฿{product.price.toFixed(2)}</p>
                <p className={styles.productStock}>Stock: {product.stock}</p>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={() => setSelectedProduct(null)}>✖</button>
              <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.modalImage} />
              <h2 className={styles.modalTitle}>{selectedProduct.name}</h2>
              <p className={styles.modalPrice}>Price: ฿{selectedProduct.price.toFixed(2)}</p>
              <p className={styles.modalDescription}>{selectedProduct.description}</p>
              <p className={styles.modalStock}>Stock: {selectedProduct.stock}</p>
              <div className={styles.modalActions}>
                <button
                  className={`${styles.addToCartButton} ${selectedProduct.stock === 0 ? styles.disabledButton : ''}`}
                  onClick={() => handleAddToCart(selectedProduct)}
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

        {/* Upload Product Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>✖</button>
              <h2>Upload New Product</h2>

              {/* Image Preview - Appears Above Name */}
              {imagePreview && <img src={imagePreview} alt="Preview" className={styles.imagePreview} />}

              <input type="file" accept="image/*" onChange={handleImageChange} />
              <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))} />
              <input type="text" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))} />
              <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))} />
              <input type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))} />
              <select onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))} value={newProduct.category}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>{category.name}</option>
                ))}
              </select>
              <button className={styles.uploadButton} onClick={handleUpload}>Upload Product</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default ShopPage;