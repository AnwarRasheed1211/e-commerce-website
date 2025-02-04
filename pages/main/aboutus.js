import { useState } from 'react';
import styles from '../../styles/Aboutus.module.css';
import Navbar from '../../components/Navbar';

export default function AboutUs() {
  return (
    <>
    <Navbar/>
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>About Us</h1>
        <p>We are passionate about providing the best products and services to our customers.</p>
      </section>

      <section className={styles.content}>
        <div className={styles.card}>
          <h2>Our Mission</h2>
          <p>Our mission is to deliver high-quality products that bring joy and value to our customers.</p>
        </div>

        <div className={styles.card}>
          <h2>Our Team</h2>
          <p>We are a team of dedicated professionals committed to excellence and customer satisfaction.</p>
        </div>

        <div className={styles.card}>
          <h2>Contact Us</h2>
          <p>Email: contact@yourcompany.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </section>
    </main>
    </>
  );
}
