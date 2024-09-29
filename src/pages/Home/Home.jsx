import './home.css'
import Header from "../../Components/HeaderHome/Header";
import Description from '../../Components/Description/Description';
import Planos from '../../Components/Planos/Planos';
import Footer from '../../Components/Footer/footer';

export default function Home() {
    return (
        <>
            <Header/>
            <Description/>
            <Planos/>
            <Footer/>
        </>
    )
}