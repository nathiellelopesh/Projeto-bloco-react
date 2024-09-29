import { useState, useEffect } from 'react'
import Filter from '../../Components/Filter/Filter'
import HeaderUser from '../../Components/HeaderUser/HeaderUser'
import './quizz.css'
import Quizz1 from '../../Components/Quizz1/Quizz1'
import Footer from '../../Components/Footer/Footer'

const data = {
    "filmes": [
      {
        "nome": "Inception",
        "ano": "2010",
        "genero": "Ficção Científica",
        "palavras": ["sonhos", "realidade", "tecnologia", "ação"],
        "poster": "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg"
      },
      {
        "nome": "Parasite",
        "ano": "2019",
        "genero": "Drama",
        "palavras": ["classes sociais", "suspense", "família"],
        "poster": "https://media.newyorker.com/photos/5da4a5c756dcd400082a63ba/master/pass/Brody-Parasite.jpg"
      },
      {
        "nome": "The Matrix",
        "ano": "1999",
        "genero": "Ação/Ficção Científica",
        "palavras": ["realidade virtual", "luta", "filosofia"],
        "poster": "https://rollingstone.com.br/media/_versions/2024/04/matrix-5-esta-em-desenvolvimento-mas-nao-tera-irmas-wachowski-na-direcao-foto-divulgacaowarner-bros-pictures_widelg.jpg"
      },
      {
        "nome": "The Shawshank Redemption",
        "ano": "1994",
        "genero": "Drama",
        "palavras": ["esperança", "prisão", "amizade"],
        "poster": "https://media.vanityfair.com/photos/541c841b1019a3955fea0c58/master/w_2560%2Cc_limit/shawshank-redemption-20th-anniversary-01.jpg"
      },
      {
        "nome": "Interstellar",
        "ano": "2014",
        "genero": "Ficção Científica",
        "palavras": ["viagem espacial", "amor", "tempo"],
        "poster": "https://www.esquerda.net/sites/default/files/styles/imagem_principal_500/public/bg_0.jpg.webp?itok=oJCY9L_g"
      }
    ],
    "series": [
      {
        "nome": "Breaking Bad",
        "ano": "2008",
        "genero": "Crime/Drama",
        "palavras": ["química", "criminalidade", "transformação"],
        "poster": "https://monkeybuzz.com.br/wp-content/uploads/2015/02/breaking-bad-season-51-647x430.jpg"
      },
      {
        "nome": "Stranger Things",
        "ano": "2016",
        "genero": "Ficção Científica/Horror",
        "palavras": ["anos 80", "misterio", "paranormal"],
        "poster": "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/12/stranger-things-ultima-temporada.webp"
      },
      {
        "nome": "Game of Thrones",
        "ano": "2011",
        "genero": "Fantasia",
        "palavras": ["realeza", "guerra", "intriga"],
        "poster": "https://institutoconectomus.com.br/wp-content/uploads/2021/09/csm_Game-of-Thrones-19_49e96a78b5.jpg"
      },
      {
        "nome": "The Crown",
        "ano": "2016",
        "genero": "Drama",
        "palavras": ["história", "monarquia", "política"],
        "poster": "https://veja.abril.com.br/wp-content/uploads/2016/11/the-crown.jpg?quality=70&strip=all%201376915"
      },
      {
        "nome": "The Mandalorian",
        "ano": "2019",
        "genero": "Aventura/Fantasia",
        "palavras": ["Star Wars", "caçador de recompensas", "galáxia"],
        "poster": "https://lumiere-a.akamaihd.net/v1/images/the_mandalorian_s3_ep5_front_3272026a.jpeg?region=154,0,892,502"
      }
    ]
  }

export default function Quizz() {
    const [ano, setAno] = useState('');
    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [categoria, setCategoria] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const [quizzIndex, setQuizzIndex] = useState(0)
    const [scoreTotal, setScoreTotal] = useState(0)
    const [quizFinished, setQuizFinished] = useState(false);
    const [palavrasList, setPalavrasList] = useState([]);

    const palavrasAleatorias = () => {
      const palavrasList = [];
      const totalFilmes = data.filmes.length;
      const totalSeries = data.series.length;
      
      for (let i = 0; i < 2; i++) {
        const filmeAleatorioIndex = Math.floor(Math.random() * totalFilmes);
        const palavraAleatoriaIndex = Math.floor(Math.random() * data.filmes[filmeAleatorioIndex].palavras.length);
        const palavraFilme = data.filmes[filmeAleatorioIndex].palavras[palavraAleatoriaIndex];
        palavrasList.push(palavraFilme);
      }
    
      for (let i = 0; i < 2; i++) {
        const serieAleatorioIndex = Math.floor(Math.random() * totalSeries);
        const palavraAleatoriaIndex = Math.floor(Math.random() * data.series[serieAleatorioIndex].palavras.length);
        const palavraSerie = data.series[serieAleatorioIndex].palavras[palavraAleatoriaIndex];
        palavrasList.push(palavraSerie);
      }
    
      return palavrasList;
    };
    
    
    useEffect(() => {
      if (filteredList.length > 0 && quizzIndex < filteredList.length) {
          // Gera palavras aleatórias apenas quando o quizzIndex muda
          setPalavrasList(palavrasAleatorias());
      }
  }, [quizzIndex, filteredList]);


    function filtrarFilmes(ev) {
      ev.preventDefault();
      let filtered = [...data.filmes, ...data.series];

      if (ano) {
        filtered = filtered.filter(item => item.ano === ano);
      }
      if (nome) {
        filtered = filtered.filter(item => item.nome.toLowerCase().includes(nome.toLowerCase()));
      }
      if (genero) {
        filtered = filtered.filter(item => item.genero === genero);
      }
      if (categoria) {
        if (categoria === 'filmes') {
          filtered = filtered.filter(item => data.filmes.includes(item));
        } else if (categoria === 'series') {
          filtered = filtered.filter(item => data.series.includes(item));
        }
      }

      setFilteredList(filtered);
      console.log(ano, nome, genero, categoria)

      setAno('')
      setNome('')
      setGenero('')
      setCategoria('')
      setQuizzIndex(0)
      setScoreTotal(0)
      setQuizFinished(false);
    }

    const handleNext = () => {

      if(filteredList.length > 0 && filteredList.length > quizzIndex)
      setQuizzIndex(quizzIndex + 1);
      else if (filteredList.length > quizzIndex) {
        alert("Não tem mais perguntas do quizz");
      }
    };

    const handleScoreUpdate = (score) => {
      setScoreTotal(scoreTotal + score);
      if (quizzIndex >= filteredList.length - 1) {
        setScoreTotal(scoreTotal + score);
          setQuizFinished(true);
      }
      console.log(score)
    };

  

    return (
        <section className='user-page'>
        <HeaderUser/>
        <Filter ano={ano} setAno={setAno} nome={nome} setNome={setNome} genero={genero} setGenero={setGenero} categoria={categoria} setCategoria={setCategoria} filtrar={filtrarFilmes}/>
        
        <div className='filteredList-container'>
        {quizFinished ? (<p>Pontos: Em breve essa funcionalidade será implementada</p>) : (
        filteredList.length > 0 ? (
          <>
          <Quizz1
              key={quizzIndex}
              image={filteredList[quizzIndex].poster}
              palavra1={palavrasList[0]}
              palavra2={palavrasList[1]}
              palavra3={palavrasList[2]}
              palavra4={palavrasList[3]}
              palavra5={filteredList[quizzIndex].palavras[0]}
              palavra6={filteredList[quizzIndex].palavras[1]}
              scoredPoints={handleScoreUpdate}
              
          />
          <button className='quizz-next-btn' onClick={handleNext}>
              Próximo
          </button>
          </>
        ) : (
          <p>Nenhum resultado encontrado</p>
        )
        )}
        </div>
        <Footer/>
        </section>
    )
}

