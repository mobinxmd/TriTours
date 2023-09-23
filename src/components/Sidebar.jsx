import { Outlet } from 'react-router'
import AppNav from './AppNav'
import Logo from './Logo'
import styles from './Sidebar.module.css'
import {AiFillCloseCircle} from 'react-icons/ai';
import { useCities } from '../contexts/citiesContext';

export default function Sidebar() {
    const {handleOpen}= useCities()
    

    return (
        <>
            <div className={styles.sidebar}>
                <span onClick={handleOpen} className={styles.closeMenu}>
                 <AiFillCloseCircle />
                </span>
                <Logo />
                <AppNav />

                <Outlet />

                <footer className={styles.footer}>
                    <p className={styles.copyright}>
                        &copy;{new Date().getFullYear()} Copyright by: Mohammad Mobin Mahmood.
                    </p>
                </footer>

            
            </div>
        </>
    )
}
