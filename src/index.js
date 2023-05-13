import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('SAGA/FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('SAGA/FETCH_GENRES', fetchGenres)
    yield takeEvery('SAGA/GET_DETAILS', getMovieDetails)
    // yield takeEvery('SAGA/MOVIE_DETAILS', getMovieDetails)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// gotta get the details/genres of a single movie
function* getMovieDetails(action) {
    try{
        // use the movie ID we sent through the action to request genres of said movie
        const movieGenres = yield axios.get(`api/movie/single/${action.payload}`)
        console.log("Got our single movie genre_id's:", movieGenres.data)
        // after receiving information regarding our clicked movie, I'll put all that info in a reducer to be called upon in Details
        yield put({ type: 'MOVIE_GENRES', payload: movieGenres.data})
    } catch{
        console.log("Error connecting to server in getMovieDetails");
    }
}

// might not actually need this, since I will just be getting the ones relevant to the movie that was clicked?
function* fetchGenres() {
    // gotta get all the categories + relationships to the movies from the DB
    try{
        const genres = yield axios.get('/api/genre');
        yield put({type: 'SET_GENRES', payload: genres.data})
    } catch {
        console.log("Couldn't get genres from database");
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// reducer to store the ID of the movie the user clicked, to then be used to fetch all relevant data about that movie
const clickedMovie = (state=0, action) => {
    switch (action.type) {
        case 'CLICKED_MOVIE':
            return action.payload;
        default:
            return state;
    }
}
// reducer to store the genre_id's of the clicked movie, to be compared with the genre's
const singleMovieGenres = (state=[], action => {
    switch (action.type) {
        case 'MOVIE_GENRES':
            // spread operator to add array of genres being added
            return [...state, action.payload];
        default:
            return state;
    }
})

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        clickedMovie,
        singleMovieGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
