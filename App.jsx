import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { useState } from "react"; 


import { BrowserRouter, Routes,Route } from "react-router-dom";
import Banner from "./components/Banner";


function App() {
  let [watchlist, setWatchList] = useState([])

  let handleaddtoWatchlist= (movieObj)=>{
    let newwatchlist=[...watchlist, movieObj]
    localStorage.setItem('moviesApp', JSON.stringify(newwatchlist))
    setWatchList(newwatchlist)
    console.log(newwatchlist)
  }

  let removefromwatchlist=(movieObj)=>{
    let filteredWatchlist = watchlist.filter((movie)=>{
      return movie.id != movieObj.id
    })
   
    setWatchList(filteredWatchlist)
    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchlist))
  }

  useEffect(()=>{
    let moviesfromlocalstorage= localStorage.getItem('moviesApp')
    if(!moviesfromlocalstorage){
      return;
    }
    setWatchList(JSON.parse(moviesfromlocalstorage))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route path='/' element={<><Banner/> <Movies watchlist={watchlist} handleaddtoWatchlist={handleaddtoWatchlist} removefromwatchlist={removefromwatchlist}/></> }/>
            <Route path='/watchlist' element={ <WatchList watchlist={watchlist} setWatchList={setWatchList} removefromwatchlist={removefromwatchlist}/>} />
        
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
