import { useRef } from "react";

function SongCard({ song, onClick }) {
    const audioRef = useRef(null);

    const handlePlay = () => {
        document.querySelectorAll("audio").forEach(a => {
            if (a !== audioRef.current)
                a.pause();
        });
    }

    return (
        <div className='bg-gray-900 rounded-lg p-3 shadow hover:bg-gray-800 transition'>
            <img src={song.cover} alt={song.title} 
              className='rounded-md w-full' />

            <p className='font-semibold mt-3'>{song.title}</p>
            <p className='text-sm text-gray-400'>{song.artist}</p>

            {
              song.preview && (
                <audio 
                    onPlay={handlePlay}
                    ref={audioRef}
                    controls 
                    className='mt-3 w-full'>
                  <source src={song.preview} type='audio/mpeg' />
                </audio>
              )
            }

            <button 
              onClick={onClick}
              className='mt-3 w-full bg-green-600 text-white rounded-lg py-1 hover:bg-grenn-700 transition cursor-pointer'>
              Más como esta
            </button>
          </div>
    );
}

export default SongCard;