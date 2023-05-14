import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';

// MUI components
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// wanted my MUI to be dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    // guess I need a ThemeProvider + CssBaseLine component to enable dark mode?
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App bg-bottom bg-gradient-to-br from-cyan-500 to-red-400 font-sans h-max">
        <header className='w-auto text-white bg-black border-8 border-transparent font-semibold'>
          <h1 className='text-4xl'>The Movies Saga!</h1>
        </header>
        <Routes>        
          <Route path="/" element={<MovieList /> } />
          
          <Route path='/details' element={<Details />} />

          {/* Add Movie page */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}


export default App;
