function SearchBar({ search, setSearch, onSearch }) {
    return (
        <div className='flex gap-2'>
            <input 
                className='bg-gray-800 border border-gray-700 p-2 
                    rounded w-full text-white'
                
                onChange={(e) => setSearch(e.target.value)}
                type="text" 
                placeholder='Artista, canción o género...'
                value={search}
            />
            <button 
                onClick={onSearch}
                className='bg-green-600 hover:bg-green-700 
                px-4 rounded text-white cursor-pointer'>
                Buscar
            </button>
        </div>
    );
}

export default SearchBar;