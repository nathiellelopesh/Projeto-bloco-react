import { useEffect, useState } from "react";
import BasicButtons from "../Button/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './quizz3.module.css'

export default function Quizz3({ nextQuestion, filteredList, updateTotalScore }) {
    const [overview, setOverview] = useState("");
    const [missingWords, setMissingWords] = useState([]);
    const [missingWordsIndex, setMissingWordsIndex] = useState([])
    const [options, setOptions] = useState([])
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0)

    function handleNextButton() {
        updateTotalScore(score);
        setScore(0);
        nextQuestion()
    }

    function getOverview() {
        const index = Math.floor(Math.random() * filteredList.length);
        const Currentoverview = filteredList[index].overview
        setOverview(Currentoverview)
    }

    function getMissingWords() {
        const palavras = overview.split(" ");

        //console.log("palavras: ", palavras)
        let correctWords = [];
        let indexMissingWords = [];

        while (indexMissingWords.length < 3) {
            const index = Math.floor(Math.random() * palavras.length);

            if (!indexMissingWords.includes(index)) {
                indexMissingWords.push(index);
                correctWords.push(palavras[index]);
            }
        }
        console.log(correctWords)
        setMissingWords(correctWords);
        setMissingWordsIndex(indexMissingWords)

        const options = correctWords.map((palavracorreta) => {
            const option = [palavracorreta]

            while (option.length < 3) {
                const index = Math.floor(Math.random() * palavras.length);
                const currentWord = palavras[index]
    
                if (!option.includes(currentWord) && !correctWords.includes(currentWord)) {
                    option.push(currentWord);
                }
            }
            return option
        })
        console.log(options)
        setOptions(options)
    }

    useEffect(() => {
        getOverview();
    }, [filteredList]);

    useEffect(() => {
        if (overview) {
            getMissingWords();
        }
    }, [overview]);

    function handleAnswerChange(index, answer) {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [index]: answer,
        }));
    }

    function calculateScore() {
        let newScore = 0;
        missingWordsIndex.forEach((index) => {
            if (userAnswers[index] === missingWords[missingWordsIndex.indexOf(index)]) {
                newScore++;
            }
        });

        setScore(newScore);
    }

    useEffect(() => {
        calculateScore();
    }, [userAnswers]);


    return (
        <section className={styles.quizzConatainer}>
            <h3>Fill in the blanks</h3>
            <p>{overview}</p>
            {overview ? (
                <>
                    <p>
                        {overview.split(" ").map((word, index) => {
                            const missingWord = missingWordsIndex.find(item => item === index);

                            if (missingWord) {
                                return (
                                    <span key={index}>
                                        <Select
                                            value={userAnswers[index] || ""}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        >
                                            {options[missingWordsIndex.indexOf(index)].map((option) => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </span>
                                );
                            }

                            return <span key={index}>{word} </span>
                        })}
                    </p>
                    <div>
                        <p>Score: {score} / 3</p>
                    </div>
                    <BasicButtons onclickFunction={handleNextButton} variant={"contained"} text={"Next"} />
                </>
            ) : (
                <div>
                    <p>Stream without overview</p>
                    <BasicButtons onclickFunction={handleNextButton} variant={"contained"} text={"Next"} />
                </div>
            )}
        </section>
    )
}

