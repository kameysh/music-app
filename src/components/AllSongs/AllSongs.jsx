import React, { useEffect, useState } from 'react';
import Songs from "../Songs/Songs";
import SearchBox from "../SearchBox/SearchBox";

export default function AllSongs(props) {

  const [songs, setSongs] = useState([]);
  const [searchTxt, setSearchTxt] = useState({ searchBox: '' });

  useEffect(() => {
    fetchSongs();
  }, [])

  const fetchSongs = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/albums');
    const fetchedSongs = await data.json();
    console.log(fetchedSongs);
    setSongs(fetchedSongs);
  }

  function searchSong(e) {
    setSearchTxt({ ...searchTxt, searchBox: e.target.value });
  }

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
