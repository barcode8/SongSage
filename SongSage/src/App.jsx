import { useState } from 'react'
import './App.css'
import GenreSelect from './components/GenreSelector'

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-zinc-900 shadow">
        <h1 className="text-2xl font-bold text-red-600 font-[Open_Sans]">SongSage</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white cursor-pointer">Login</button>
          <button className="px-4 py-2 border border-red-600 hover:bg-red-600 rounded text-white cursor-pointer">Sign Up</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-3xl font-semibold mb-6">Select a Genre</h2>
        <GenreSelect onGenreChange={handleGenreChange} />
      </div>
    </div>
  );
}

export default App;
