import React from 'react';
import "./SearchBox.css";

export default function SearchBox(props) {
    return (
        <div className='search-box-center'>
            <input onChange={props.searchBoxChange} className="search-box" type="text" placeholder="Search Songs" />
        </div>
    )
}
