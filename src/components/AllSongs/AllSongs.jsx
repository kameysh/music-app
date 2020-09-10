import React, { useEffect, useState } from 'react';
import Songs from "../Songs/Songs";
import SearchBox from "../SearchBox/SearchBox";

export default function AllSongs(props) {

  const [songs, setSongs] = useState([]);
  const [searchTxt, setSearchTxt] = useState({ searchBox: '' });
  //Rendering and calling the function only once when the component is rendered.
  useEffect(() => {
    fetchSongs();
  }, [])

  //Async call to fetch the songs using fetch API
  const fetchSongs = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/albums');
    const fetchedSongs = await data.json();
    console.log(fetchedSongs);
    setSongs(fetchedSongs);
  }
  
  //function to search the songs and handle the user input text

  function searchSong(e) {
    setSearchTxt({ ...searchTxt, searchBox: e.target.value });
  }
 
  //based on the user input text the songs list will be filtered by using the below filter technique
   
  const filteredSongs = songs.filter(song => {
    return song.title.toLowerCase().includes(searchTxt.searchBox.toLowerCase());
  })

  return (
    <div>
      <SearchBox searchBoxChange={searchSong} />
      <Songs actions={props.actions} songs={filteredSongs} />
    </div>
  )
}
