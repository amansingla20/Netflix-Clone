import axios from '../../axios';
import './Row.css';
import React,{useState, useEffect} from 'react'
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_img_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({title, fetchURL, isLargeRow}) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);   
        }
        fetchData();
    },[fetchURL]);
    
    const opts ={
        height: '390',
        width: '100%',
        playerVars:{
            autoplay:0,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
          setTrailerUrl('')
        } else {
          movieTrailer(movie?.name || "")
            .then((url) => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
      }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row-posters'>
                {
                    movies.map((movie)=>(
                        <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                        src={`${base_img_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name} />
                    ))
                }
            </div>
            <div style={{padding: '40px'}}>
            { trailerUrl && <Youtube videoId={trailerUrl} opts ={opts}/>}
            </div>
        </div>
    )
}

export default Row
