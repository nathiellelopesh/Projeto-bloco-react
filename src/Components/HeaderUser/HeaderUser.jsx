import { BiSolidCameraMovie } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {Link} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

import styles from './index.module.css'

export default function HeaderUser() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const confirma = window.confirm("Deseja mesmo sair?")
        try {
            if(confirma) {
                await signOut(auth);
                console.log('Usuário desconectado com sucesso!');
                navigate('/signin');
            } else {
                return
            }
            
        } catch (error) {
            console.error('Erro ao fazer logout: ', error);
        }
    };

    return (
        <header className={styles.headerUser_container}>
            <Link to='/'><BiSolidCameraMovie  size={"2.5rem"} color="white"/></Link>
            <div className={styles.sair} onClick={handleLogout}>
                <CgProfile size={"2.5rem"} color="white" />
                <p>Sair</p>
            </div>
        </header>
    )
}