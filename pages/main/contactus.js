
import styles from '../../styles/Contact.module.css';
import Navbar from '../../components/Navbar';

export default function Contact() {
  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.description}>
          Have questions? Feel free to reach out to us!
        </p>
        <div className={styles.contactForm}>
          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="4" placeholder="Write your message" required></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </div>
      </main>
    </div>
    </>
  );
}
