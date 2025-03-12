// data.js - Product and Category Data

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Clothes", slug: "clothes" },
  { name: "Bags", slug: "bags" },
];

const products = [
  // Electronics Category
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation.",
    image: "/wireless headphone.webp", // Corrected path
    stock: 15,
  },
  {
    id: 2,
    name: "Smartwatch",
    category: "electronics",
    price: 149.99,
    description: "Waterproof smartwatch with fitness tracking features.",
    image: "/smart watch.jpg", // Corrected path
    stock: 10,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    category: "electronics",
    price: 49.99,
    description: "Ergonomic gaming mouse with customizable RGB lighting.",
    image: "/gaming mouse.jpg", // Corrected path
    stock: 0, // Out of stock
  },

  // Clothes Category
  {
    id: 4,
    name: "Casual T-Shirt",
    category: "clothes",
    price: 19.99,
    description: "Comfortable cotton t-shirt in various colors.",
    image: "/casual shirt.jpg", // Corrected path
    stock: 30,
  },
  {
    id: 5,
    name: "Denim Jeans",
    category: "clothes",
    price: 39.99,
    description: "Slim fit denim jeans for all-day comfort.",
    image: "/denim jeans.jpg", // Corrected path
    stock: 25,
  },

  // Bags Category
  {
    id: 6,
    name: "Leather Backpack",
    category: "bags",
    price: 79.99,
    description: "Stylish leather backpack with multiple compartments.",
    image: "/leather backpack.webp", // Corrected path
    stock: 8,
  },
  {
    id: 7,
    name: "Tote Bag",
    category: "bags",
    price: 29.99,
    description: "Eco-friendly tote bag, perfect for shopping and daily use.",
    image: "/tote bag.jpg", // Corrected path
    stock: 20,
  },
];

export { categories, products };