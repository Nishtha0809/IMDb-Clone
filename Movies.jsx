
import MovieCard from './MovieCard'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'

function Movies({handleaddtoWatchlist,removefromwatchlist,watchlist}) {

  const[movies, setMovies] = useState([])
  const[pageNo, setpageNo] = useState(1)

  const handleprev = () =>{
    if(pageNo===1){
      setpageNo(pageNo)
    }
    else{
      setpageNo(pageNo-1)
    }
  }
   const handlenext = () =>{
    setpageNo(pageNo+1)
  }

  useEffect (()=>{
    axios.get (`https://api.themoviedb.org/3/movie/popular?api_key=0e17deb3b599a6cc599bf14790441e14&language=en-US&page=${pageNo}`).then(function(res){
     setMovies(res.data.results)
    })
  },[pageNo])

  return (

  <div className='p-5'>
    <div className='text-2xl m-5 font-bold text-center'>
      Trending Movies
    </div>

    <div className='flex flex-row flex-wrap justify-around gap-8'>
     {movies.map((movieObj)=>{
      return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleaddtoWatchlist={handleaddtoWatchlist} removefromwatchlist={removefromwatchlist} watchlist={watchlist}/>
     })}
      
    </div>
    <Pagination pageNo={pageNo} handleprev={handleprev} handlenext={handlenext}/>
  </div>
  )
}
export default Movies

// 'https://api.themoviedb.org/3/movie/popular?api_key=0e17deb3b599a6cc599bf14790441e14&language=en-US&page=1'