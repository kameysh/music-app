import React from 'react';
import "./Nav.css";
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Nav() {
    //setting up the routes to work with LINK component.
    return (
        <div>
            <div className='container'>
                <ul className="navs">
                    <Link to='/'><li><Button positive className='btn'>All Songs</Button></li></Link>
                    <Link to='/playlists'><li><Button positive className='btn'>Playlists</Button></li></Link>
                </ul>
            </div>
        </div>
    )
}

export default Nav;