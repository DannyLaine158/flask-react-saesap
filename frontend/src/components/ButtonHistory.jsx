function ButtonHistory({ stopAllAudio, setHistory, setResults, history }) {
    return (
        <button 
            className='bg-yellow-600 hover:bg-yellow-700 
                  px-4 py-2 mt-3 rounded text-white cursor-pointer'  

            onClick={() => {
            stopAllAudio();
            const last = history[history.length - 1];

            // Quitar del historial
            setHistory(prev => prev.slice(0, prev.length - 1));

            // Volver a resultados anteriores
            setResults(last);
          }}>
            Regresar
        </button>
    );
}

export default ButtonHistory;