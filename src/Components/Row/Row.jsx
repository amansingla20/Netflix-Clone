import axios from '../../axios';
import './Row.css';
import React,{useState, useEffect} from 'react'

const base_img_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({title, fetchURL, isLargeRow}) => {

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);   
        }
        fetchData();
    },[fetchURL]);
    

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row-posters'>
                {
                    movies.map((movie)=>(
                        <img key ={movie.id} src={`${base_img_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} alt={movie.name} className={`row-poster ${isLargeRow && 'row-posterLarge'}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Row
