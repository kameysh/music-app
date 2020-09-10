import React from 'react';
import Nav from "./components/Nav/Nav";
import AllSongs from "./components/AllSongs/AllSongs";
import PlayLists from "./components/PlayList/PlayLists";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <h1 style={{textAlign: 'center'}}>React Music Player</h1>
        <br />
        <hr />
        <Nav />
        <Switch>
          <Route path='/' exact component={AllSongs} />
          <Route path="/playlists" component={PlayLists} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;