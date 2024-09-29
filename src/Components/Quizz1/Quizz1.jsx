import { useState } from 'react'
import './quizz.css'

export default function Quizz1 ({image, nome, palavra1, palavra2, palavra3, palavra4, palavra5, palavra6, scoredPoints}) {
    const [selectedWords, setSelectedWords] = useState([]);
    const [score, setScore] = useState(0);
    

    const words = [palavra1, palavra2, palavra3, palavra4, palavra5, palavra6];
    

    function handleSelected(palavra) {
        
        
        if (selectedWords.includes(palavra)) { 
            setSelectedWords(selectedWords.filter(word => word !== palavra)); // Se a palavra já está selecionada, vai remover
            
            if (palavra === palavra5 || palavra === palavra6) {
                setScore(Math.max(score - 1, 0)); // Se a palavra removida era uma das corretas, diminui score
            }
        } else if (selectedWords.length < 2) {
           
            setSelectedWords([...selectedWords, palavra]);
           
            if ((palavra === palavra5 || palavra === palavra6) && score < 2) {
                setScore(score + 1);
            }
        }
        scoredPoints(score);
    }



    return (
        <section className='quizz1-container'>
            <h3>Selecione as 2 palavras que estão relacionadas ao filme ou série</h3>
            <img src={image} alt={nome}/>
            <div>
                {words.map((palavra, index) => (
                    <span
                        key={index}
                        className={selectedWords.includes(palavra) ? "selected" : ""}
                        onClick={() => handleSelected(palavra)}
                    >
                        {palavra}
                    </span>
                ))}
                
            </div>
            
            
        </section>
    )
}

