import { useEffect, useState } from "react";
import BasicButtons from "../Button/Button";
import styles from './style.module.css'

export default function Quizz4({ nextQuestion, filteredList, updateTotalScore }) {
    const [answer, setAnswer] = useState('');
    const [unorderedTitleName, setUnorderedTitleName] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');
    const [score, setScore] = useState(0);

    function handleNextButton() {
      
        updateTotalScore(score);
        setScore(0);
        nextQuestion()
    }

    function getTitles() {
        const index = Math.floor(Math.random() * filteredList.length);
        const titleName = filteredList[index].name || filteredList[index].title;
        const titleLength = titleName.length;
        setAnswer(titleName)
        setOptions([answer])
 
        let controlIndex = []
        let unorderedTitle = ''

        while(controlIndex.length !== titleLength) {
            const index = Math.floor(Math.random() * titleLength);

            if(!controlIndex.includes(index)) {
                controlIndex.push(index)
                unorderedTitle+=titleName[index]
            }
        }
        setUnorderedTitleName(unorderedTitle);

        let controlOptions = [titleName]
        let controlIndexoptions = []

        while(controlOptions.length !== 4) {
            const index = Math.floor(Math.random() * filteredList.length);
            const titleName = filteredList[index].name || filteredList[index].title;
            if(!controlIndexoptions.includes(index)) {
                controlOptions.push(titleName)
                controlIndexoptions.push[index]
            }
        }
        setOptions(controlOptions)
    }

    useEffect(() => {
        getTitles()
    }, [filteredList])

    function handleSelected(word) {
        
        setSelectedWord(word)
        if (word === answer) {
            setScore(1);
        } else {
            setScore(0);
        } 
    }

    return (
        <section className={styles.quizz_container}>
            <h3>Select the Original Title from the random letters</h3>
            <p className={styles.title}>{unorderedTitleName}</p>
            <div>
                {options.map((word) => (
                    <span
                        key={word}
                        onClick={() => handleSelected(word)}
                        className={`${selectedWord===word ? styles.selected : styles.notSelected}`}
                    >
                        {word}
                    </span>
                ))}
                
            </div>
            <div className={styles.showPoints}>
                <p className={styles.points}>Points: {score}</p>
            </div>
            <BasicButtons onclickFunction={handleNextButton} variant={"contained"} text={"Next"}/>
        </section>
    )
}
