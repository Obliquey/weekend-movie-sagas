import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MovieList.css'

// MUI components
import { styled } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

// I believe this is the formula to expand the card dropdown. I copied this over from MUI's card component section tho, so we'll see
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


function MovieList() {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const navigate = useNavigate();
    // const clickedMovie = useSelector(store => store.clickedMovie);
    
    

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
        <main className=''>
            <h1 className='text-3xl mb-2 mt-1'>MovieList</h1>
            <section className='grid grid-cols-5 gap-x-1 gap-y-7 justify-items-center'>
                {movies.map(movie => {
                    return (
                        <span key={movie.id}>
                            <Card variant="outlined" sx={{ 
                                maxHeight: 330,
                                maxWidth: 200,
                                }} onClick={() => {handleClick(movie.id)}}>
                                <CardActionArea >
                                    <CardHeader
                                        title={movie.title}
                                    />
                                    <CardMedia 
                                        component="img"
                                        image={movie.poster}
                                        alt={movie.description}
                                    />
                                </CardActionArea>
                            </Card>
                        </span>
                        // <span key={movie.id} >
                        //     <h3>{movie.title}</h3>
                        //     <img src={movie.poster} alt={movie.title} onClick={() => {handleClick(movie.id)}}/>
                        // </span>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;