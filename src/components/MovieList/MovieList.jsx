import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const navigate = useNavigate();
    const clickedMovie = useSelector(store => store.clickedMovie);
    

    useEffect(() => {
        dispatch({ type: 'SAGA/FETCH_MOVIES' });
        dispatch({type: 'SAGA/FETCH_GENRES'})
    }, []);

    const handleClick = (id) => {
        dispatch({
            type: 'CLICKED_MOVIE',
            payload: id
        })
        navigate('/details')
    }
    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => {handleClick(movie.id)}}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;