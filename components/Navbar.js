import Link from "next/link";
import styles from '../styles/customer.module.css';
import Image from "next/image";

const customerNavbar = () => {
    return (
        <nav className={styles.navBar}>
            <div className={styles.navContent}>
                <div className={styles.logoContainer}>
                    <Image src="/log0.jpg" alt="Logo" width={80} height={80} />
                </div>
                <div className={styles.buttonContainer}>
                    <Link href={'/mainpage/homepage'}>
                    <div className={styles.button}>
                        HOME
                    </div>
                    </Link>
                    <Link href={'/main/browse'}>
                    <div className={styles.button}> 
                        MENU 
                    </div>
                    </Link>
                    <Link href={'/addtocart'}>
                    <div className={styles.button}> 
                        BOOKING INFO
                    </div>
                    </Link>
                    <Link href={'/main/checkout'}>
                    <div className={styles.button}> 
                        GALLERY 
                    </div>
                    </Link>          
                </div>
            </div>
        </nav>
    );
};

export default customerNavbar;
