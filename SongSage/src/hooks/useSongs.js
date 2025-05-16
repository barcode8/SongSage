import { useState } from "react";

const useSongs=()=>{
    const [songs,setSongs]=useState([]);
    const [error,setError]=useState(null);

    const fetchSongs= async (genre)=>{
        try{
            const response=await fetch(`http://127.0.0.1:5000/spotify/genre-tracks?genre=${genre}`)
            if(!response.ok) throw new Error(`Error fetching!! Status:${response.status}`)
            const data=await response.json();
            if(data.tracks){
                setSongs(data.tracks)
            }else{
                setSongs([]);
                setError("No songs found")
            }
        }catch(error){
            setError(error);
        }
    }

    return {songs,error,fetchSongs}
}

export default useSongs