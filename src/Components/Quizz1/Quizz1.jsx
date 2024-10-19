import { useState, useEffect } from 'react'
import styles from './index.module.css'

export default function Quizz1 ({image, nome, nextQuestion, showId, filteredList, tmdbApi, categoria }) {
    
    const [selectedWords, setSelectedWords] = useState([]);
    const [score, setScore] = useState(0);
    const [keywords, setKeywords] = useState([])
    const [nextIdWords, setNextIdWords] = useState([])
    const [wordsQuestion, setWordsQuestion] = useState([])

    function handleSelected(word) {
        if (!selectedWords.includes(word) && selectedWords.length < 2) {
            setSelectedWords([...selectedWords, word]);
            if (keywords.includes(word)) {
              setScore(score + 1)
            }
        } else if (selectedWords.includes(word)) {
          setSelectedWords(selectedWords.filter((item) => item !== word))
          if (keywords.includes(word)) {
            setScore(score - 1);
          }
        }        
    }

    //Palavras-chave do filme atual
    async function currentIdKeywords() {
      setKeywords([])
      try {
        if(showId) {
          const currentCategory = categoria==='movies' ? 'movie' : 'tv'
          const response = await tmdbApi.get(`/${currentCategory}/${showId}/keywords`);

          let words = categoria==='movies' ? response.data.keywords : response.data.results;
          const newKeywords = words.map(word => word.name);
          setKeywords(newKeywords);
          console.log("palavras do show atual: ", words)
          //console.log("palavras da serie atual:", response.data.results)
        }
      } catch (error) {
        console.log("Erro ao coletar palavras chaves", error)
      }
    }
  
    useEffect(() => {
      currentIdKeywords()
    }, [showId])
      
      //palavras-chave para mesclar com as palavras corretas
    async function nextIdKeywords() {
      setNextIdWords([])
      try {
        const nextIndex = filteredList.findIndex(show => show.id === showId) + 1
        const nextId = filteredList[nextIndex].id

        const currentCategory = categoria==='movies' ? 'movie' : 'tv'
        const response = await tmdbApi.get(`/${currentCategory}/${nextId}/keywords`);

        let words = categoria==='movies' ? response.data.keywords : response.data.results;

        const newKeywords = words.map(word => word.name);
        console.log("palavras do proximo show: ", words)
        setNextIdWords(newKeywords)
        console.log("palavras da prox serie:", response.data.results)
      } catch (error) {
        console.log("Erro ao coletar palavras chaves do proximo id", error)
      }
    }
  
    useEffect(() => {
      if (showId) {
        nextIdKeywords();
      }
    }, [showId, filteredList]);

    function unorderedWords () {
      const wordsForQuestion = new Set() //tipo array sem valores iguais

      while (wordsForQuestion.size < 3 && keywords.length > 0) {
        const randomIndex = Math.floor(Math.random() * keywords.length);
        wordsForQuestion.add(keywords[randomIndex]);
      }

      while (wordsForQuestion.size < 6 && nextIdWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * nextIdWords.length);
        wordsForQuestion.add(nextIdWords[randomIndex]);
      }
      setWordsQuestion(Array.from(wordsForQuestion));
    }

    useEffect(() => {
      if (keywords.length > 0 || nextIdWords.length > 0) {
          unorderedWords();
      }
    }, [keywords, nextIdWords]);

    return (
        <section className={styles.quizz_container}>
            <h3>Select 2 words related to the show</h3>
            <img src={image} alt={nome}/>
            <div>
                {wordsQuestion.map((word, index) => (
                    <span
                        key={index}
                        onClick={() => handleSelected(word)}
                        className={`${selectedWords.includes(word) ? styles.selected : styles.notSelected}`}
                    >
                        {word}
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

