import { BiSolidCameraMovie } from "react-icons/bi";
import {Link} from 'react-router-dom';
import styles from './index.module.css'

export default function Header() {
    return (
        
        <header>
            <section className={styles.heaver_container}>
            <div className={styles.header_nav}>
                <BiSolidCameraMovie  size={"2.5rem"} color="white"/>
                <div className={styles.header_buttons}>
                    <Link to='/signup' className={styles.header_btn}>Cria Conta</Link>
                    <Link to='/signin' className={styles.header_btn}>Entrar</Link>
                </div>
            </div>
            
                <div className={styles.header_title}>
                <h1>Aprender Inglês nunca</h1>
                <h1>foi tão divertido!</h1>
                <Link to='/quizz' className={styles.header_btn}>Começar</Link>
            </div>
            
            </section>
            
        </header>
    )
}