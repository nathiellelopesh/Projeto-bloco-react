import { useState, useEffect } from 'react'
import styles from './index.module.css'
import { all } from 'axios';

export default function Quizz1 ({image, nome, nextQuestion, showId, filteredList, tmdbApi, categoria }) {
    
    const [selectedWords, setSelectedWords] = useState([]);
    const [score, setScore] = useState(0);
    const [rightKeywords, setRightKeywords] = useState([]);
    const [wordsList, setWordsList] = useState([]);


    function handleSelected(word) {
      if (selectedWords.length < 2) {
        if (!selectedWords.includes(word)) {
          setSelectedWords((prev) => [...prev, word]);
          if (rightKeywords.some((palavra) => palavra.name === word)) {
            setScore((prev) => prev + 1); 
          }
        }
      } else if (selectedWords.includes(word)) {
        setSelectedWords((prev) => prev.filter((palavra) => palavra !== word)); 
        if (rightKeywords.some((palavra) => palavra.name === word)) {
          setScore((prev) => prev - 1); 
        }
      }
        
    }

    //Palavras-chave do poster correto
    async function currentIdKeywords() {
      setRightKeywords([])
      try {
        for (let i = 0; i < filteredList.length; i++) {
          const randomFilteredListIndex = Math.floor(Math.random() * filteredList.length);
          const randomId = filteredList[randomFilteredListIndex].id;
    
          const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
          const response = await tmdbApi.get(`/${currentCategory}/${randomId}/keywords`);
          const keywords = categoria === 'movies' ? response.data.keywords : response.data.results;
    
          // Verifica se keywords não está vazio
          if (keywords && keywords.length > 0) {
            setWordsList(keywords);
            setRightKeywords(keywords);
            console.log("palavras-chave corretas: ", keywords);
            return keywords; // Retorna se encontrar palavras
          } else {
            console.log(`Nenhuma palavra-chave encontrada para ID: ${randomId}`);
          }
        }
    
        console.log("Nenhuma palavra-chave encontrada após verificar todos os IDs.");
        return [];
      } catch (error) {
        console.log("Erro ao coletar palavras chaves", error)
        return []
      }
    }
  
      
      //palavras-chave para mesclar com as palavras corretas
    async function randomWords() {
      try {
        
        const randomFilteredListIndex = Math.floor(Math.random() * filteredList.length)
        const randomId = filteredList[randomFilteredListIndex].id

        const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
        const response = await tmdbApi.get(`/${currentCategory}/${randomId}/keywords`)
        const keywords = categoria === 'movies' ? response.data.keywords : response.data.results
        
        setWordsList((prevWords) => [...prevWords, ...keywords]);
        console.log("palavras-chave aleatorias: ", keywords)
        
      } catch (error) {
        console.log("Erro ao coletar palavras chaves aleatorias", error)
      }
    }
  
    useEffect(() => {
      const fetchKeywords = async () => {
        const correctKeywords = await currentIdKeywords();
        if (correctKeywords.length) {
          randomWords(); 
        }
      };
      
      fetchKeywords();
    }, [showId]);


    return (
        <section className={styles.quizz_container}>
            <h3>Select 2 words related to the show</h3>
            <img src={image} alt={nome}/>
            <div>
                {wordsList.map((word) => (
                    <span
                        key={word.id}
                        onClick={() => handleSelected(word.name)}
                        className={`${selectedWords.includes(word.name) ? styles.selected : styles.notSelected}`}
                    >
                        {word.name}
                    </span>
                ))}
                <button onClick={nextQuestion} className={styles.header_btn}>Next</button>
            </div>
            <div className={styles.showPoints}>
                <p className={styles.points}>Points: {score}</p>
                
            </div>
            
        </section>
    )
}

