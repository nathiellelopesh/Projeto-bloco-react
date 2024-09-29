import { BiSolidCameraMovie } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {Link} from 'react-router-dom';

import './headerUser.css'

export default function HeaderUser() {
    return (
        <header className="headerUser-container">
            <Link to='/'><BiSolidCameraMovie  size={"2.5rem"} color="white"/></Link>
            <CgProfile size={"2.5rem"} color="white"/>
        </header>
    )
}