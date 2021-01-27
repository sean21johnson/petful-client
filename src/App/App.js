import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import AdoptionPage from "./../AdoptionPage/AdoptionPage";
import "./App.css";

//Adopt button functionality
//Auto timer functionality

class App extends Component {
	renderRoutes() {
		return (
			<>
				<Route exact path="/" component={LandingPage} />
				<Route path="/adoption" component={AdoptionPage} />
			</>
		);
	}

	render() {
		return <main className="App">{this.renderRoutes()}</main>;
	}
}

export default App;
