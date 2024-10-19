import { useState, useEffect } from 'react';
import styles from './index.module.css'

export default function Filter({ano, setAno, genero, setGenero, categoria, setCategoria, filtrar, tmdbApi}) {

    const [genreSelect, setGenreSelect] = useState([])

    async function moviesGenre() {
      try {
        const genres = []
        
        const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
        const response = await tmdbApi.get(`/genre/${currentCategory}/list?language=en`);
        const genreListId = response.data.genres

        for(let i=0;i<genreListId.length; i++) {
          const genre = genreListId[i].name
          genres.push(genre)
        }

        setGenreSelect(genres)
      } catch (error) {
        console.error(error);
      }
      
    }

    useEffect(() => {
      moviesGenre()
    }, [categoria])

    return (
        <form className={styles.filter} onSubmit={filtrar}>
            <p>Filter:</p>
            <input placeholder='Year'value={ano} onChange={(ev) => setAno(ev.target.value.trim())}/>

            <select value={categoria} onChange={(ev) => setCategoria(ev.target.value)}>  
                <option value="movies">Movies</option>
                <option value="series">Series</option>
            </select>

            
              <select value={genero} onChange={(ev) => setGenero(ev.target.value)}>
                {genreSelect.map((genre, i) => (
                    <option key={i} value={genre}>{genre}</option>
                ))}   
              </select>
            
            

            

            <button type='submit' className={styles.filter_btn}>Start</button>
        </form>
    )
}

