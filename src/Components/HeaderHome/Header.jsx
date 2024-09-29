import { BiSolidCameraMovie } from "react-icons/bi";
import {Link} from 'react-router-dom';
import './header.css'

export default function Header() {
    return (
        
        <header>
            <section className="heaver-container">
            <div className="header-nav">
                <BiSolidCameraMovie  size={"2.5rem"} color="white"/>
                <div className="header-buttons">
                    <Link to='/quizz' className="header-btn">Cria Conta</Link>
                    <Link to='/quizz' className="header-btn">Entrar</Link>
                </div>
            </div>
            
                <div className="header-title">
                <h1>Aprender Inglês nunca</h1>
                <h1>foi tão divertido!</h1>
                <Link to='/quizz' className="header-btn">Começar</Link>
            </div>
            
            </section>
            
        </header>
    )
}