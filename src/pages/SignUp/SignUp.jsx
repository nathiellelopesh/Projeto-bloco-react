//
import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { useAppContext } from "../../context";
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {Link} from 'react-router-dom';
import { BiSolidCameraMovie } from "react-icons/bi";

const auth = getAuth();

export default function Signup() {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('')
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            setErrorMessage("As senhas não coincidem");
            return;
        }
        setErrorMessage("");

        try {
            await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            console.log("Usuário criado com sucesso!");
            setMessage('Usuário criado com sucesso!!');
            navigate("/signin");
        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            setErrorMessage("Erro ao tentar se cadastrar");
            setErrorMessage("Senha deve ter pelo menos 6 caracteres");
        }
    };


    return (
        <section style={styles.containerSignUp}>
            <header style={styles.headerUser}>
                <Link to='/'><BiSolidCameraMovie  size={"2.5rem"} color="white"/></Link>
            </header>
            <div style={styles.formContainer}>
                <form onSubmit={handleSignUp} style={styles.form}>
                    <h2>Cadastro de Usuário:</h2>
                    <input
                        style={styles.input}
                        placeholder='Email'
                        value={userData.email}
                        onChange={(ev) => setUserData({ ...userData, email: ev.target.value })}
                        required
                    />

                    <input
                        style={styles.input}
                        type="password"
                        placeholder='Senha'
                        value={userData.password}
                        onChange={(ev) => setUserData({ ...userData, password: ev.target.value })}
                        required
                    />

                    <input
                        style={styles.input}
                        type="password"
                        placeholder='Confirme Senha'
                        value={userData.confirmPassword}
                        onChange={(ev) => setUserData({ ...userData, confirmPassword: ev.target.value })}
                        required
                    />

                    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                    {message && <p style={styles.message}>{message}</p>}

                    <button type='submit' style={styles.btn}>Start</button>
                </form>
            </div>
            <Footer/>
        </section>
    )
}

const styles = {
    containerSignUp: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    formContainer: {
        height: '100%',
        marginTop: '25px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
    },
    input: {
        padding: '15px',
        width: '60vw'
    },
    btn: {
        padding: '15px',
        width: '60vw',
        backgroundColor: '#1a0279',
        color: '#fff'
    },
    errorMessage: {
        color: 'red',
    },
    message: {
        color: 'green'
    },
    headerUser: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#1a0279',
        padding: '20px 35px'
    }
}