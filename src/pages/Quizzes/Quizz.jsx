import { useState, useEffect } from 'react';
import Filter from '../../Components/Filter/Filter';
import HeaderUser from '../../Components/HeaderUser/HeaderUser';
import Footer from '../../Components/Footer/Footer';
import axios, { all } from 'axios';
import Quizz1 from '../../Components/Quizz1/Quizz1';
import Quizz2 from '../../Components/Quizz2/Quizz2';
import styles from './index.module.css'
import Quizz3 from '../../Components/Quizz3/Quizz3';
import Quizz4 from '../../Components/Quizz4/Quizz4';

export default function Quizz() {
    const [ano, setAno] = useState('');
    const [genero, setGenero] = useState('');
    const [categoria, setCategoria] = useState('series');
    const [filteredList, setFilteredList] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const [showId, setShowId] = useState(null)
    const [genreListId, setGenreListId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quizzIndex, setQuizzIndex] = useState(1);
    const [allScore, setAllScore] = useState([]);
    
    const private_key = import.meta.env.VITE_PRIVATE_API_KEY;

    const tmdbApi = axios.create({
      baseURL: "https://api.themoviedb.org/3",
      params: {
        api_key: private_key,
        language: 'en-US'
      }
    });

    async function fetchGenreList() {
      try {
        const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
        const response = await tmdbApi.get(`/genre/${currentCategory}/list?language=en`);
        return response.data.genres; // Retorna a lista de gêneros com id e nome
      } catch (error) {
        console.error("Erro ao buscar a lista de gêneros", error);
      }
    }
    
    useEffect(() => {
      async function getGenres() {
        const genres = await fetchGenreList();
        setGenreListId(genres);
        //console.log("generos:", genres)
      }
      getGenres();
    }, []);

    let generoId = null;

    if (genreListId) {
      for (let i = 0; i < genreListId.length; i++) {
        if (genero === genreListId[i].name) {
          generoId = genreListId[i].id;
          break; // Encontrou o gênero, pode sair do loop
        }
      }
    }

    async function moviesList() { 
      let response = ''
      try {
        if(ano && !genero) {
          response = await tmdbApi.get(`/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&year=${ano}`)
        } else if (!ano && genero) {
          response = await tmdbApi.get(`/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${generoId}`)
        } else if (ano && genero) {
          response = await tmdbApi.get(`/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${generoId}&year=${ano}`)
        }
        
        //console.log("lista de filmes: ", response.data);
        return response;
      } catch (error) {
        console.error("Erro em moviesList", error);
      }
    }

    async function seriesList() { 
      let response = ''
      try {
        if(ano && !genero) {
          response = await tmdbApi.get(`/discover/tv?first_air_date_year=${ano}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`)
        }else if (!ano && genero) {
          response = await tmdbApi.get(`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${generoId}`)
        } else if (ano && genero) {
          response = await tmdbApi.get(`/discover/tv?first_air_date_year=${ano}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${generoId}`)
        }
        
        //console.log("lista de séries: ", response.data.results);
        return response;
      } catch (error) {
        console.error("Erro em seriesList", error);
      }
    }
    

    async function fetchAllData() {
      setFilteredList([]);
      setLoading(true);
      setQuizzIndex(1)
      try {

        const moviesResponse = await moviesList();
        const serieResponse = await seriesList();

        let allResults = [];

        // Verifique se moviesResponse não é nulo antes de acessar os dados
        if(categoria === 'movies') {
            allResults = [...(moviesResponse && moviesResponse.data ? moviesResponse.data.results : [])]
        } else if (categoria === 'series') {
            allResults = [...(serieResponse && serieResponse.data ? serieResponse.data.results : [])];
        }

        setFilteredList(allResults);

        //console.log('All Results:', allResults);

        if (allResults.length > 0) {
          const indexAllResults = Math.floor(Math.random() * allResults.length);
          setShowId(allResults[indexAllResults].id);
        } else {
          console.log('Nenhum resultado encontrado.');
        }
        
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchAllData()
    }, [ano, genero, categoria])


    //stream atual
    async function streamDetails() {
      if (showId) {
        try {
          const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
          const response = await tmdbApi.get(`/${currentCategory}/${showId}?language=en-US`);
          //console.log("Detalhes: ",response.data);

          setShowDetails(response.data)
          
        } catch (error) {
          console.log(error);
        }
      }
    }

    useEffect(() => {
      streamDetails()
      //console.log(filteredList)
    }, [showId])

    function handleNext() {

      setQuizzIndex((prevIndex) => {
        if (prevIndex < 6) { 
          return prevIndex + 1;
        } else {
          return prevIndex; // Se chegou ao final, mantém o último índice
        }
      });
      //console.log("quizzIndex:", quizzIndex);
    };

    const updateTotalScore1 = (uniqueScore) => {
      console.log("score1: ", uniqueScore)
      setAllScore([uniqueScore])
    };

    const updateTotalScore2 = (uniqueScore) => {
      console.log("score2: ", uniqueScore)
      setAllScore(prev => [...prev, uniqueScore])
    };

    const updateTotalScore3 = (uniqueScore) => {
      console.log("score3: ", uniqueScore)
      setAllScore(prev => [...prev, uniqueScore])
    };

    const updateTotalScore4 = (uniqueScore) => {
      console.log("score4: ", uniqueScore)
      setAllScore(prev => [...prev, uniqueScore])
    };

    useEffect(() => {
      console.log('array de score:', allScore)
    }, [allScore])
    

    return (
        <section className={styles.user_page}>
        <HeaderUser/>
        <Filter
          ano={ano}
          setAno={setAno}
          tmdbApi={tmdbApi}
          genero={genero}
          setGenero={setGenero}
          categoria={categoria}
          setCategoria={setCategoria}
          filtrar={(event) => {event.preventDefault(); fetchAllData()} }
        />
        
        <div className={styles.filteredList_container}>

          {loading ? (<p>LOADING...</p>) : (filteredList.length > 0 ? (
              <>
              {quizzIndex === 1 && 
                <Quizz1
                  key={showDetails.id}
                  image={showDetails.poster_path ? `https://image.tmdb.org/t/p/w500${showDetails.poster_path}` : 'placeholder-image-url'} 
                  nome={showDetails.title}
                  nextQuestion={handleNext}
                  showId={showId}
                  filteredList={filteredList}
                  tmdbApi={tmdbApi}
                  categoria={categoria}
                  updateTotalScore={updateTotalScore1}
                />
              }
              
              {quizzIndex === 2 &&
                <Quizz2
                  key={showDetails.id} 
                  nextQuestion={handleNext}
                  showId={showId}
                  filteredList={filteredList}
                  tmdbApi={tmdbApi}
                  categoria={categoria}
                  updateTotalScore={updateTotalScore2}
                />
              }

              {quizzIndex === 3 &&
                <Quizz3
                  filteredList={filteredList}
                  nextQuestion={handleNext}
                  updateTotalScore={updateTotalScore3}
                />
              }

              {quizzIndex === 4 &&
                <Quizz4
                  filteredList={filteredList}
                  nextQuestion={handleNext}
                  updateTotalScore={updateTotalScore4}
                />
              }

              {quizzIndex === 5 && (
                <section>
                  <h3>End of Questions!!</h3>
                  <h4>Total points: {allScore.reduce((acc, score) => acc + score, 0)}</h4>
                </section>)}
              </>
          ) : (
            <p>Not Found</p>
          )
          )}
        </div>

        

        <Footer/>
        </section>
    )
}

