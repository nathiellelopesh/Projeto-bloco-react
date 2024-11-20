import BasicButtons from '../Button/Button';
import styles from './index.module.css'
import { useEffect, useState } from 'react';

export default function Quizz2({ nextQuestion, filteredList, tmdbApi, categoria, updateTotalScore }) {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [classSelected, setClassSelected] = useState(false)
    const [score, setScore] = useState(0);
    const [videos, setVideos] = useState([]);
    const [randomIds, setRandomIds] = useState([]);
    const [overview, setOverview] = useState('')
    const [idOverview, setIdOverview] = useState('')

    function handleNextButton() {
      
        updateTotalScore(score);
        setScore(0);
        nextQuestion()
    }

    function handleSelected(videoId) {
        setClassSelected(!classSelected)
        if (idOverview === videoId) {
            if (selectedVideo !== videoId) {
                setSelectedVideo(videoId)
                setScore(1)
            } else if (selectedVideo === videoId) {
                setSelectedVideo('')
                setScore(0)
            }
        } else if (idOverview !== videoId) {
            if (selectedVideo !== videoId) {
                setSelectedVideo(videoId)
                setScore(0)
            } else if (selectedVideo === videoId) {
                setSelectedVideo('')
                setScore(0)
            }
        }
        
    }

    async function getVideo1() {
        try {
            let keyVideo;
            let currentId = null;
            let attempts = 0;

            while (attempts < filteredList.length) {
                const indexFilteredList = Math.floor(Math.random() * filteredList.length);
                currentId = filteredList[indexFilteredList].id;
    
                // Verifique se o currentId já foi utilizado
                if (!randomIds.includes(currentId)) {
                    const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
                    const response = await tmdbApi.get(`/${currentCategory}/${currentId}/videos?language=en-US`);
    
                    keyVideo = response.data.results[0]?.key;
    
                    if (keyVideo) {
                        const linkVideo = `https://www.youtube.com/embed/${keyVideo}`;
                        setVideos((prevVideos) => [...prevVideos, { linkVideo, id: currentId }]);
                        setRandomIds((prevId) => [...prevId, currentId]);
                        break; // Sai do loop se um vídeo válido foi encontrado
                    }
                }
                attempts++;
            }

            if (keyVideo === undefined) {
                console.log("Nenhum vídeo encontrado após várias tentativas.");
            }
            //console.log("keyvideo 1:" , keyVideo)
        } catch (error) {
            console.log("Erro ao carregar video 1", error);
        }
    }


    async function getVideo2() {
        try {
            let keyVideo;
            let currentId = null;
            let attempts = 0;

            while (attempts < filteredList.length) {
                const indexFilteredList = Math.floor(Math.random() * filteredList.length);
                currentId = filteredList[indexFilteredList].id;
    
                // Verifique se o currentId já foi utilizado
                if (!randomIds.includes(currentId)) {
                    const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
                    const response = await tmdbApi.get(`/${currentCategory}/${currentId}/videos?language=en-US`);
    
                    keyVideo = response.data.results[0]?.key;
    
                    if (keyVideo) {
                        const linkVideo = `https://www.youtube.com/embed/${keyVideo}`;
                        setVideos((prevVideos) => [...prevVideos, { linkVideo, id: currentId }]);
                        setRandomIds((prevId) => [...prevId, currentId]);
                        break; // Sai do loop se um vídeo válido foi encontrado
                    }
                }
                attempts++;
            }

            if (keyVideo === undefined) {
                console.log("Nenhum vídeo encontrado após várias tentativas.");
            }
            //console.log("keyvideo 2:" , keyVideo)
        } catch (error) {
            console.log("Erro ao carregar video 2", error);
        }
    }

    async function getVideo3() {
        try {
            let keyVideo;
            let currentId = null;
            let attempts = 0;

            while (attempts < filteredList.length) {
                const indexFilteredList = Math.floor(Math.random() * filteredList.length);
                currentId = filteredList[indexFilteredList].id;
    
                // Verifique se o currentId já foi utilizado
                if (!randomIds.includes(currentId)) {
                    const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
                    const response = await tmdbApi.get(`/${currentCategory}/${currentId}/videos?language=en-US`);
    
                    keyVideo = response.data.results[0]?.key;
    
                    if (keyVideo) {
                        const linkVideo = `https://www.youtube.com/embed/${keyVideo}`;
                        setVideos((prevVideos) => [...prevVideos, { linkVideo, id: currentId }]);
                        setRandomIds((prevId) => [...prevId, currentId]);
                        break; // Sai do loop se um vídeo válido foi encontrado
                    }
                }
                attempts++;
            }

            if (keyVideo === undefined) {
                console.log("Nenhum vídeo encontrado após várias tentativas.");
            }
            //console.log("keyvideo 3:" , keyVideo)
        } catch (error) {
            console.log("Erro ao carregar video 3", error);
        }
    }



    useEffect(() => {
        getVideo1();
        getVideo2();
        getVideo3();
    }, [])

    async function getOverview() {
        try {
            const randomIndex = Math.floor(Math.random() * randomIds.length);
            const randomId = randomIds[randomIndex];

            const currentCategory = categoria === 'movies' ? 'movie' : 'tv';
            const response = await tmdbApi.get(`/${currentCategory}/${randomId}?language=en-US`);
            const overview = response.data.overview

            setOverview(overview)
            setIdOverview(randomId)
            //console.log(randomId)
        } catch (error) {
            console.log("Erro ao carregar sinopse", error);
        }
    }

    useEffect(() => {
        getOverview()
    }, [randomIds])

    return (
        <section className={styles.quizz_container}>
            <h3>Select the correct trailer according to the overview</h3>
            <p className={styles.overview}>{overview}</p>
            <div className={styles.videos}>
                {videos.map((video) => (
                    <iframe width="300" height="200"
                        key={video.id}
                        src={video.linkVideo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className={`${selectedVideo === video.id ? styles.selected : styles.video}`}
                        onClick={() => handleSelected(video.id)}
                        >
                    </iframe>
                ))
                }
                
            </div>
            <BasicButtons onclickFunction={handleNextButton} variant={"contained"} text={"Next"}/>
            
            <div className={styles.showPoints}>
                <p className={styles.points}>Points: {score}</p>
            </div>
            
        </section>
    )
}