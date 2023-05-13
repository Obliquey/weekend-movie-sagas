import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Details() {
    const movieID = useSelector(store => store.clickedMovie);
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies)
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch({type: 'SAGA/MOVIE_DETAILS', payload: movieToShow})
    // }, [])
    const arr = movies.filter(movie => movie.id === movieID)
    const movieToShow = arr[0]
    console.log("This is our movie:", movieToShow);

    return (

        <>
            <h2>{movieToShow.title}</h2>
            <img src={movieToShow.poster} alt={movieToShow.description} />
            <p>{movieToShow.description}</p>
            <button onClick={() => navigate('/')}>Go Back</button>
        </>
    )
}
export default Details;