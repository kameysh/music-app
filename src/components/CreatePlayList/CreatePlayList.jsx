import React, { useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Lodash from "lodash";
import PlayListInfo from "../PlayListInfo/PlayListInfo";
import "./CreatePlayList.css";
//using Pandora library to simplify the local storage usage.
import Pandora from "@faizaanceg/pandora";


export default function CreatePlayList() {

    const [value, setValue] = useState('');
    const [playListNames, setPlayListNames] = useState(Pandora.get('PlayList', []));
    const [clicked, setClicked] = useState(false);

    //function to capture the Playlist value
    function setPlayList(e) {
        setValue(e.target.value);
    }

    //pushing the entered playlist name to the array
    function addHandler(e) {
        //preventing from loading the page on submitting the button
        e.preventDefault();
        //updating the state immutably by creating a copy of the original state
        const newArr = playListNames;
        newArr.push({ id: playListNames.length, value: value, createdAt: (new Date()).toLocaleString(), songs: [] });
        Pandora.set('PlayList', newArr); //storing it in the local storage of browser with key Playlist
        setPlayListNames(newArr);
        setValue('');
        setClicked(false);
    }

    function removeFromPlayList(playListId, Song) {
        console.log(playListId);
        let listIndex = playListNames.findIndex((playList) => playList.id == playListId)
        playListNames[listIndex].songs = playListNames[listIndex].songs.filter(ExistingSong => {
            return ExistingSong.id !== Song.id
        })
        Pandora.set('PlayList', playListNames);
        setPlayListNames(playListNames);
    }

    function updatePlayList(playListId, Song) {
        console.log(playListId);
        let listIndex = playListNames.findIndex((playList) => playList.id == playListId)
        playListNames[listIndex].songs.push(Song)
        Pandora.set('PlayList', playListNames);
        setPlayListNames(playListNames);
    }



    return (
        //setting up switch to handle the route and render the correct route as needed
        <Switch>
            <div className='container'>
                {/* passing the children prop in route to get the id */}
                <Route exact path='/playlists/:selected'>
                    <PlayListInfo
                        // setting the props to remove and update the playlist
                        removeFromPlayList={removeFromPlayList}
                        //updating the playlist 
                        updatePlayList={updatePlayList} />
                </Route>
                <Route exact path='/playlists'>
                    <div className='container'>
                        <div className='play'>
                            {Lodash.reverse(playListNames).map((PlayList, index) => (
                                //passing the playlist id in the URL to access it and use the same to update or delete the list
                                <Link className='link' to={`/playlists/${PlayList.id}`}> <li className='playlists' key={PlayList.id}>
                                    <h4 className='bold'>{PlayList.value}</h4>
                                    <h4 className='bold'>Created: {PlayList.createdAt}</h4>
                                </li>
                                </Link>
                            ))}
                        </div>
                        <div className='playlist' style={{ textAlign: 'center' }}>
                            <button className='btn' onClick={() => setClicked(true)}>Create a Playlist</button>
                            {/* conditionally rendering the form to create a playlist */}
                            {clicked ? <form>
                                <input placeholder="Enter Playlist Name" className='create-playlist' required value={value} onChange={setPlayList} type='text' />
                                <button className='btn' onClick={addHandler} type='submit'>Add List</button>
                            </form> : null}
                        </div>
                    </div>
                </Route>
            </div>
        </Switch>
    )
}