import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Details() {
    const movieID = useSelector(store => store.clickedMovie);
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies)
    const navigate = useNavigate();

    // using the movie ID, I'm sending the ID back to the DB to get all genres associated with that movieID
    useEffect(() => {
        dispatch({ type: 'SAGA/GET_DETAILS', payload: movieID})
    }, [])
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