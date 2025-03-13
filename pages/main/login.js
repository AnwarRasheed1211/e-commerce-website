import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/login.module.css"; // Import CSS
import Navbar from "../../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

 
  const hardcodedUser = {
    email: "admin@example.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    if (trimmedEmail === hardcodedUser.email && trimmedPassword === hardcodedUser.password) {
      const userData = { email: trimmedEmail, isAdmin: true }; // Add isAdmin flag
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/"); // Redirect to homepage
    } else {
      setError("Invalid email or password");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Login</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
            />
            <button type="submit" className={styles.button}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
