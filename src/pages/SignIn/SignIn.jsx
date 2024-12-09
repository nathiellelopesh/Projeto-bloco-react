import { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import { useAppContext } from "../../context";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import { BiSolidCameraMovie } from "react-icons/bi";

const auth = getAuth();

export default function SignIn() {
    const [login, setLogin] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useAppContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/quizz');
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, login.email, login.password);
            navigate('/quizz');
        } catch (erro) {
            setErrorMessage("Credencial inválido");
            console.error('Erro ao logar: ', erro);
            
        }
    };


    return (
        <section style={styles.containerSignIn}>
            <header style={styles.headerUser}>
                <Link to='/'><BiSolidCameraMovie  size={"2.5rem"} color="white"/></Link>
            </header>
            <div style={styles.formContainer}>
                <form onSubmit={handleLogin} style={styles.form}>
                    <h2>Login:</h2>
                    <input
                        placeholder="email"
                        style={styles.input}
                        label={"Email"}
                        type="email"
                        value={login.message}
                        onChange={(ev) => setLogin({ ...login, email: ev.target.value })}
                        required
                    />
                    <input
                    placeholder="senha"
                        style={styles.input}
                        label={"Senha"}
                        value={login.password}
                        type="password"
                        onChange={(ev) => setLogin({ ...login, password: ev.target.value })}
                        required
                    />
                    
                    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

                    <button type='submit' style={styles.btn}>Entrar</button>
                </form>
            </div>
            <Footer/>
        </section>
    )
}

const styles = {
    containerSignIn: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    errorMessage: {
        color: 'red',
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
    headerUser: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#1a0279',
        padding: '20px 35px'
    }
}