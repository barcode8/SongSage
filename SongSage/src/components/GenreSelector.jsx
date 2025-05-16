import useGenres from "../hooks/useGenres";
import { useState } from "react";
import useSongs from "../hooks/useSongs";

const GenreSelect = ({ onGenreChange }) => {
  const { genres, genreError } = useGenres();
  const { songs, songError, fetchSongs } = useSongs();
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    onGenreChange(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedGenre) {
      fetchSongs(selectedGenre);
    }
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-80">
      {genreError && <p className="text-red-500 mb-2">Error: {genreError}</p>}
      <select
        className="w-full mb-4 px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        onChange={handleGenreChange}
      >
        <option value="">--Select Genre--</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>{genre}</option>
        ))}
      </select>
      <button
        className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white mb-4 cursor-pointer"
        onClick={handleSubmit}
      >
        Get Songs
      </button>
      {songError && <p className="text-red-500 mb-2">{songError}</p>}
      {songs.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Top Songs</h2>
          <ul className="space-y-2">
            {songs.map((song, index) => (
              <li key={index} className="bg-zinc-700 p-2 rounded">
                {song.name} - {song.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenreSelect;
