import React, { useEffect } from "react";
import { useState } from "react";
import genreids from '../Utility/genre'


function WatchList({watchlist,setWatchList,removefromwatchlist}) {

  const[search, setSearch] = useState('')
  const[genrelist, setGenrelist] =useState(['All Genres'])
  const[currgenre, setCurrgenre]= useState('All Genres')

  let handlesearch=(e)=>{
    setSearch(e.target.value)
  }

  let handlefilter= (genre)=>{
    setCurrgenre(genre)
  }

  let sortincreasing=()=>{
    let sortedincresing= watchlist.sort((movieA , movieB)=>{
      return movieA.vote_average - movieB.vote_average
    })
    setWatchList([...sortedincresing])
  }

   let sortdecreasing=()=>{
     let sorteddecreasing= watchlist.sort((movieA , movieB)=>{
      return movieB.vote_average - movieA.vote_average
    })
    setWatchList([...sorteddecreasing])
  }

  useEffect (()=>{
    let temp= watchlist.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp= new Set(temp)
    setGenrelist(['All Genres', ...temp])
  },[watchlist]) 

  return (
    <>

    <div className="flex justify-center flex-wrap m-4">

      {genrelist.map((genre)=>{
        return <div onClick={()=>handlefilter(genre)} className={currgenre==genre?"flex justify-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold items-center mx-4":"flex justify-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold items-center mx-4" }>{genre}</div>
      })}
    </div>

      <div className="flex justify-center my-4">
        <input onChange={handlesearch} value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4 "
        />
      </div>

      <div className="overflow-hidden rounded-lg border boder-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>

              <th className="flex justify-center">
                <div onClick={sortincreasing} className="p-2"><i class="fa-solid fa-arrow-up"></i></div>
              <div className="p-2">Ratings</div>
              <div onClick={sortdecreasing} className="p-2"><i class="fa-solid fa-arrow-down"></i></div>
              </th>

              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>

            {watchlist.filter((movieObj)=>{
              if(currgenre=='All Genres'){
                return true
              }
              else{
                return genreids[movieObj.genre_ids[0]]==currgenre
              }
            }).filter((movieObj)=>{
             
             return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())

            }).map((movieObj)=>{
              return  <tr className="border-b-2">
              <td className="flex items-center px-6 py-4">
                <img className="h-[6rem] w-[10rem]"
                  src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                />

                <div className="mx-10">
                  {movieObj.title}
                </div>
              </td>

              <td>{movieObj.vote_average}</td>
              <td>{movieObj.popularity}</td>
              <td>{genreids[movieObj.genre_ids[0]]}</td>

              <td onClick={()=>removefromwatchlist(movieObj)} className="text-red-800 cursor-pointer font-semibold">Delete</td>

            </tr>
            })}

          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;

// import React from 'react';

// function WatchList() {
//   return (
//     <>
//       <div className="flex justify-center my-4">
//         <input
//           type="text"
//           placeholder="Search Movies"
//           className="h-[3rem] w-[18rem] bg-gray-200 outline-none placeholder-gray-600 px-4 rounded"
//         />
//       </div>
//     </>
//   );
// }

// export default WatchList;
