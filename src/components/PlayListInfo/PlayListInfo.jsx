import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AllSongs from "../AllSongs/AllSongs";
import Songs from "../Songs/Songs";
import Lodash from "lodash";
import Pandora from "@faizaanceg/pandora";
export default function PlayListInfo(props) {
    const { selected } = useParams()

    const [showSong, setShowSong] = useState(false);
    let playListId = selected;
    //getting the state from the local storage. 
    const [list, setList] = useState(Pandora.get('PlayList', []));
    const FoundList = list.find((lis) => {
        return lis.id == playListId;
    })
    const [playListSongs, setPlayListSongs] = useState(FoundList.songs);

    //listening to changes in the playlist
    useEffect(() => {
        console.log(FoundList);
        setPlayListSongs(FoundList.songs);
    }, [FoundList]);

    function shuffle() {
        setPlayListSongs(Lodash.shuffle(playListSongs));
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h4 className='bold'>Playlist Name: {FoundList.value}</h4>
            <br />
            <button className='btn' onClick={shuffle}>Shuffle</button>
            <button className='btn' onClick={() => setShowSong(true)}>Add songs</button>
            {/* conditionally rendering the all songs component to show or not based on the button click */}
            {showSong ? <AllSongs actions={{
                addToPlayList: (song) => {
                    props.updatePlayList(playListId, song)
                    setList(Pandora.get('PlayList', []));
                    setShowSong(false);
                }
            }} /> : null}
            <Songs actions={{
                deleteFromPlayList: (song) => {
                    props.removeFromPlayList(playListId, song)
                    setList(Pandora.get('PlayList', []));
                }
            }} songs={playListSongs} />
        </div>
    )
}