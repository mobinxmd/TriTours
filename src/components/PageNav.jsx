import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';
import {MdOutlineMenu} from 'react-icons/md';
import { useState } from 'react';

export default function PageNav() {
       const [isOpen, setIsOpen] =useState(false)
        
    

    return (
        <>
            <nav className={styles.nav}>
                <Logo />
              
                <span className={styles.hum}>
                        <MdOutlineMenu onClick={()=> setIsOpen((s)=>!s)} />
                </span>

                <ul className={isOpen && styles.open}>
                <li>
                        <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                        <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                        <NavLink to="/login" className={styles.ctaLink_1}>Login</NavLink>
                </li>
                <li>
                        <NavLink to="/signup" className={styles.ctaLink}>Sign Up</NavLink>
                </li>
              </ul>
            </nav>
        </>
    )
}
