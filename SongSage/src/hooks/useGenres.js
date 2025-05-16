import { useCallback , useEffect , useState } from "react"

const useGenres=()=>{
    const [genres,setGenres]=useState([]);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const fetchGenres= async ()=>{
            try{
                const response=await fetch("http://127.0.0.1:5000/genres");
                if(!response.ok) throw new Error(`error!! Staus:${response.status}`);
                const data=await response.json();
                console.log(data)
                setGenres(data);
            }catch(err){
                setError(err.message)
            }
        }
        fetchGenres();
    },[]);
    return {genres,error}
}

export default useGenres;