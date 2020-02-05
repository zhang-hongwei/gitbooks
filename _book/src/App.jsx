import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Master_Detail from "./components/Master_Detail";

import Blank from "./components/Blank";

import Master_Detail2 from "./components/Master_Detail2";

import Blank2 from "./components/Blank2";

import List from "./components/List";

import List2 from "./components/List2";

import List3 from "./components/List3";

import List4 from "./components/List4";

import List5 from "./components/List5";

import Grid from "./components/Grid";

import Grid2 from "./components/Grid2";

import Grid3 from "./components/Grid3";

import Grid4 from "./components/Grid4";

import Grid5 from "./components/Grid5";

import Blank3 from "./components/Blank3";

const history = window.history
console.log("===>history", history)


//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path = "/" component = { Master_Detail } />
          <Route path = "/Blank" component = { Blank } />
          <Route path = "/Master_Detail2" component = { Master_Detail2 } />
          <Route path = "/Blank2" component = { Blank2 } />
          <Route path = "/List" component = { List } />
          <Route path = "/List2" component = { List2 } />
          <Route path = "/List3" component = { List3 } />
          <Route path = "/List4" component = { List4 } />
          <Route path = "/List5" component = { List5 } />
          <Route path = "/Grid" component = { Grid } />
          <Route path = "/Grid2" component = { Grid2 } />
          <Route path = "/Grid3" component = { Grid3 } />
          <Route path = "/Grid4" component = { Grid4 } />
          <Route path = "/Grid5" component = { Grid5 } />
          <Route path = "/Blank3" component = { Blank3 } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
