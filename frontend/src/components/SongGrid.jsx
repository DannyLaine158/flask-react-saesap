import SongCard from "./SongCard";

function SongGrid({ onSelectedSong, results }) {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6'>
            { results.map((song, i) => (
                <SongCard key={i} song={song} onClick={
                    () => onSelectedSong(song)} />
            ))}
        </div>
    );
}

export default SongGrid;