import React from 'react';
import "./Songs.css";


 function Songs(props) {

    return (
        <div className="container">
            <div className='song'>
                {props.songs.map(song => (
                   <li className="song-list" key={song.id}>
                   <div style={{flex: '2'}}><h4 className='bold'>Song Title: <h4 className='light'>{song.title}</h4></h4></div>
                   <h4 className='bold'>Play Time: {Math.floor(Math.random() * 6) + 1} mins</h4>
                   {props.actions && props.actions.addToPlayList ?  <button onClick={() => props.actions.addToPlayList(song)}>Add to List</button> : null}
                   {props.actions && props.actions.deleteFromPlayList ?  <button onClick={() => props.actions.deleteFromPlayList(song)}>Delete</button> : null}
                   </li>
                ))}
            </div>
        </div>
    )
}

export default Songs;