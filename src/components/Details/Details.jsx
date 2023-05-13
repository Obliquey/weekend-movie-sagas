import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Details() {
    // gotta access a lot of reducers for the details page, could probably build this cleaner
    const movieID = useSelector(store => store.clickedMovie);
    const movies = useSelector(store => store.movies)
    const genres = useSelector(store => store.genres)
    const singleMovieGenres = useSelector(store => store.singleMovieGenres)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch({ type: 'SAGA/GET_DETAILS', payload: movieID})
    }, [])
    
    // gotta figure out which genres match up with the singleMovieGenres
    const matchGenres = () => {
        
    }
    // using the movie ID, I'm sending the ID back to the DB to get all genres associated with that movieID
    // needed to extract clicked movie info from movies list, using movieID
    // got back an arr, so extract movie object
    const arr = movies.filter(movie => movie.id === movieID)
    const movieToShow = arr[0]

    return (

        <>
            {/* will want to make this prettier, if I have time */}
            <h2>{movieToShow.title}</h2>
            <img src={movieToShow.poster} alt={movieToShow.description} />
            <p>{movieToShow.description}</p>
            <button onClick={() => navigate('/')}>Go Back</button>
        </>
    )
}
export default Details;