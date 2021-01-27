import React, { Component } from "react";
import "./UserQueue.css";

class UserQueue extends Component {
	state = {};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.handleNewPerson(event.target["name"].value);
		event.target["name"].value = "";
	};

	render() {
		return (
			<div className="user_queue_group">
				<div className="user_queue_item">
					<h4>Adoption Queue</h4>
					<ol className="user_list">
						{this.props.people.map((person, index) => {
							return <li key={index}>{person}</li>;
						})}
					</ol>
					<form className="new_name" onSubmit={this.handleSubmit}>
						<input
							type="text"
							id="name"
							placeholder="Your Name"
							required
						></input>
						<button className="join_queue_button">Join Queue</button>
					</form>
				</div>
			</div>
		);
	}
}

export default UserQueue;
