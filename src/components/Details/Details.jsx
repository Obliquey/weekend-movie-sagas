import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

// MUI components
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
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

        <main className="h-screen">
            <div className='grid grid-cols-5 mt-6 ml-14'>
                <span className="h-7 w-auto">
                    <Card>
                        <CardMedia
                            component="img"
                            image={movieToShow.poster} />
                        <CardContent>
                            <Typography variant="h4">
                                {movieToShow.title}
                            </Typography>
                            <Typography gutterBottom variant="p" component="div">
                                {
                                    singleMovieGenres.map(obj => { 
                                        return <h3>{obj.name}</h3>
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                </span>
                <p className="ml-10 mt-10 col-span-3">{movieToShow.description}</p>
            </div>
            <div className="mt-6 ml-24">
                <Button variant="outlined" size="large" onClick={() => navigate('/')}>Go Back</Button>
            </div>
        </main>
    )
}
export default Details;