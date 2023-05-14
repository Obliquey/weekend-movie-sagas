import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

// MUI components
import { Button } from "@mui/material";
import Card from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Details() {
    // gotta access a lot of reducers for the details page, could probably build this cleaner
    const movieID = useSelector(store => store.clickedMovie);
    const movies = useSelector(store => store.movies)
    const singleMovieGenres = useSelector(store => store.singleMovieGenres)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch({ type: 'SAGA/GET_DETAILS', payload: movieID})

    }, [])
    
    // using the movie ID, I'm sending the ID back to the DB to get all genres associated with that movieID
    // needed to extract clicked movie info from movies list, using movieID
    // got back an arr, so extract movie object
    const arr = movies.filter(movie => movie.id === movieID)
    const movieToShow = arr[0]

    return (

        <main className="">



            {/* <h2>{movieToShow.title}</h2>
            <h3>Genres!</h3>
            <>
                {
                    singleMovieGenres.map(obj => { 
                        return <h3>{obj.name}</h3>
                    })
                }
            </>
            <img src={movieToShow.poster} alt={movieToShow.description} />
            <p>{movieToShow.description}</p> */}
            <button onClick={() => navigate('/')}>Go Back</button>
        </main>
    )
}
export default Details;