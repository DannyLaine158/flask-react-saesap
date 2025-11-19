import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import SongGrid from './components/SongGrid';
import Title from './components/Title';
import ButtonHistory from './components/ButtonHistory';

function App() {
  // Variables de estado
  const [ search, setSearch ] = useState('');
  const [ results, setResults ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ selectedSong, setSelectedSong ] = useState(null);
  const [ history, setHistory ] = useState([]);

  // search = 'Queen'

  const handleSearch = async () => {
    if (!search.trim()) return;

    stopAllAudio();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/search?q=${search}`);
      const data = await res.json();

      if (results.length > 0)
        setHistory(prev => [...prev, results]);

      // Agregando la lista de python a una lista de JS
      setResults(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const getRecommendations = async (id) => {
    stopAllAudio();

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5001/recommend/${id}`);
      const data = await res.json();

      if (results.length > 0)
        setHistory(prev => [...prev, results]);

      console.log(data);
      setResults(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const stopAllAudio = () => {
    document.querySelectorAll("audio").forEach(a => {
      a.pause();
      a.currentTime = 0;
    })
  }

  return (
    <div className='p-4 max-w-4xl mx-auto text-white'>
      <Title title={"Recomendador de música"} />

      <SearchBar 
        search={search} 
        setSearch={setSearch} 
        onSearch={handleSearch} />

      { loading && <Loader /> }

      { history.length > 0 && <ButtonHistory 
        stopAllAudio={stopAllAudio} setHistory={setHistory} 
        setResults={setResults} history={history} />
      }

      { !loading && (
        <SongGrid 
          results={results} 
          onSelectedSong={(song) => {
            setSelectedSong(song);
            getRecommendations(song.id)
          }}
          />
      )}
    </div>
  )
}

export default App;
