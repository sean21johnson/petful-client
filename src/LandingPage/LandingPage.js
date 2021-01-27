import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

class LandingPage extends Component {
	render() {
		return (
			<>
				<section className="landing_header">
					<div className="header_item">
						<h1 className="header_title">Petful</h1>
					</div>
					<div className="header_item"></div>
					<h2 className="header_below">Adopt your pet today!</h2>
				</section>
				<section className="landing_description">
					<div className="description_group">
						<div className="description_item item-double">
							<h3 className="description_header">Our Adoption Process</h3>
							<p className="description_paragraph">
								Here at Petful we operate on a first-come, first-serve basis.
								Click the Adoption button below to view our adoption page. On
								our adoption page, you can see the next dog and cat available
								for adoption, as well as the list of people waiting to adopt.
								Add your name to the list and when it is your turn, just click
								on the Adopt button underneath the pet and a Petful
								representative will contact you shortly thereafter to schedule a
								dropoff. If you want both the cat and the dog, click on the
								Adopt Both button.
								<br></br>
								<br></br>
								The pets available for adoption also operate on a first-come,
								first-serve basis. If Spot gets to the Petful Shelter before
								Snuggles, he'll be matched with an owner sooner. It's only fair!
								And that is exactly what we aim to do here at Petful, make
								adopting fair and efficient.{" "}
							</p>
						</div>
						<div className="description_item align-middle">
							<img
								className="adoption_drawing"
								src="https://imgur.com/AVv68ZN.jpg"
								alt="dogs and cats drawing"
							></img>
						</div>
					</div>
					<div className="description_button">
						<Link to="/adoption">
							<button className="adoption_page">Adoption</button>
						</Link>
					</div>
				</section>
			</>
		);
	}
}

export default LandingPage;
