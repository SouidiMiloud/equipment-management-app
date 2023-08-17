import React from 'react';
import Navbar from "../components/navbar.js";
import styles from "../styles/contact.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Contact() {
    
    
    return (
        
        <div className={styles.banner}>
            <Navbar />
            <div className={styles.container}>
            <form>
                <h1> Contact us </h1>
                    <input type="text" id="firstName" placeholder="First Name" className={styles.mobile} required/>
                    <input type="text" id="lastName" placeholder="Last Name" className={styles.lastName}  required />
                <input type="email" id="email" placeholder="Email" required />
                <input type="text" id="mobile" placeholder="Mobile" required />
                <h4>Type Your Message Here...</h4>
                <div className={styles.str}>
                <textarea required> </textarea>
                
                <input type="submit" value="send" className={styles.button} /> 
                </div>

            </form>
            </div>
            <div className={styles.containerinfo}>
            <div className={styles.contactinfo}>
                <div className={styles.box}>
                    <div className={styles.icon}><FontAwesomeIcon icon={faLocationDot} /></div>
                    <div className={styles.text}>
                        <h3>Adress</h3>
                        <p>Av. Allal Al Fassi, Rabat</p>
                        <div  >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.483143619603!2d-6.869935474044492!3d33.980121873184274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76cc334a66611%3A0xee9ee437a0cfbaea!2sInstitut%20national%20des%20postes%20et%20t%C3%A9l%C3%A9communications!5e0!3m2!1sfr!2sma!4v1691333752845!5m2!1sfr!2sma"
                                className={styles.map}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    
                </div>
                <div className={styles.box}>
                    <div className={styles.icon}><FontAwesomeIcon icon={faPhone} /></div>
                    <div className={styles.text}>
                        <h3>Phone</h3>
                        <p>0590732982</p>
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.icon}><FontAwesomeIcon icon={faEnvelope} /></div>
                    <div className={styles.text}>
                        <h3>Email</h3>
                    <p>inpt@gmail.com</p>
                    </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default Contact;