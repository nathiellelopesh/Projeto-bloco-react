import { useState, useEffect } from 'react';
import Filter from '../../Components/Filter/Filter';
import HeaderUser from '../../Components/HeaderUser/HeaderUser';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import Quizz1 from '../../Components/Quizz1/Quizz1';
import Quizz2 from '../../Components/Quizz2/Quizz2';
import styles from './index.module.css'

export default function Quizz() {
    const [ano, setAno] = useState('');
    const [genero, setGenero] = useState('');
    const [categoria, setCategoria] = useState('series');
    const [filteredList, setFilteredList] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const [showId, setShowId] = useState(null)
    const [genreListId, setGenreListId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quizzIndex, setQuizzIndex] = useState(0);
    
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
        
        console.log("lista de filmes: ", response.data);
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
        
        console.log("lista de séries: ", response.data.results);
        return response;
      } catch (error) {
        console.error("Erro em seriesList", error);
      }
    }
    

    async function fetchAllData() {
      setFilteredList([]);
      setLoading(true);
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

        console.log('All Results:', allResults);

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

    async function streamDetails() {
      if (showId) {
        try {
          const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
          const response = await tmdbApi.get(`/${currentCategory}/${showId}?language=en-US`);
          console.log("Detalhes: ",response.data);

          setShowDetails(response.data)
          
        } catch (error) {
          console.log(error);
        }
      }
    }

    useEffect(() => {
      streamDetails()
    }, [showId])

    const handleNext = () => {
      const currentIndex = filteredList.findIndex(show => show.id === showId);
      if (currentIndex >= 0 && currentIndex < filteredList.length - 1) {
        // Define o próximo showId com base no próximo item da lista
        setShowId(filteredList[currentIndex + 1].id);
        // Alterna entre Quizz1 e Quizz2
        setQuizzIndex((prev) => (prev + 1) % 2);
      } else {
        alert("Não há mais perguntas.");
      }
    };

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
              {quizzIndex === 0 && (
              <Quizz1
                key={showDetails.id}
                image={showDetails.poster_path ? `https://image.tmdb.org/t/p/w500${showDetails.poster_path}` : 'placeholder-image-url'} 
                nome={showDetails.title}
                handleNext={handleNext}
                nextQuestion={() => handleNext()}
                showId={showId}
                filteredList={filteredList}
                tmdbApi={tmdbApi}
                categoria={categoria}
              />
              )}
              {quizzIndex === 1 && (
              <Quizz2
                key={showDetails.id} 
                
                handleNext={handleNext}
                nextQuestion={() => handleNext()}
                showId={showId}
                filteredList={filteredList}
                tmdbApi={tmdbApi}
                categoria={categoria}
              />
              )}
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

