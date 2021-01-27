import React, { Component } from "react";
import "./AdoptionPage.css";
import UserQueue from "./../UserQueue/UserQueue";
import PetsQueue from "./../PetsQueue/PetsQueue";
import faker from "faker";
import config from "./../config";

class AdoptionPage extends Component {
	state = {
		people: [],
		cat: {},
		dog: {},
		currentPerson: null,
		message: null,
		canAdopt: false,
	};

	getCat = () => {
		fetch(`${config.API_ENDPOINT}/cat`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					cat: data,
				});
			});
	};

	getDog = () => {
		fetch(`${config.API_ENDPOINT}/dog`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					dog: data,
				});
			});
	};

	getAllPeople = () => {
		fetch(`${config.API_ENDPOINT}/people`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					people: data,
				});
			});
	};

	handleNewPerson = (person) => {
		this.addToQueue(person);
		this.setState({
			currentPerson: person,
		});
		this.startAutoAdoption();
	};

	handlePeopleQueue() {
		const stopAddPeople = setInterval(() => {
			if (this.state.people.length >= 5) {
				clearInterval(addPeople);
				clearInterval(stopAddPeople);
			}
		});
		const addPeople = setInterval(() => {
			const newName = faker.name.findName();
			this.addToQueue(newName);
		}, 5000);
	}

	addToQueue(person) {
		const name = person;
		fetch(`${config.API_ENDPOINT}/people`, {
			method: "POST",
			body: JSON.stringify({ name }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then(() => {
				this.setState({
					people: [...this.state.people, name],
				});
			});
	}

	handleAdoption = (type) => {
		this.adopt(type);
		this.setState({
			canAdopt: false,
			currentPerson: null,
		});
	};

	handleAdoptionBoth = () => {
		fetch(`${config.API_ENDPOINT}/pets`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				const [removePerson, ...people] = this.state.people;
				const canAdopt = people[0] === this.state.currentPerson;

				const message = canAdopt
					? `${this.state.currentPerson}, it is your turn to adopt!`
					: data.message;

				this.setState({
					dog: data.dog,
					cat: data.cat,
					people,
					canAdopt,
					message,
				});
			});
	};

	adopt = (type) => {
		if (!this.state[type]) {
			return;
		}

		fetch(`${config.API_ENDPOINT}/${type}`, {
			method: "DELETE",
			body: JSON.stringify({ type }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				const [removePerson, ...people] = this.state.people;
				const canAdopt = people[0] === this.state.currentPerson;

				const message = canAdopt
					? `${this.state.currentPerson}, it is your turn to adopt!`
					: data.message;

				this.setState({
					dog: data.dog,
					cat: data.cat,
					people,
					canAdopt,
					message,
				});
			});
	};

	startAutoAdoption() {
		const adoptTimer = setInterval(() => {
			const animalType = ["cat", "dog"][Math.round(Math.random())];
			this.adopt(animalType);
		}, 5000);

		const stopAutoAdopt = setInterval(() => {
			if (this.state.canAdopt) {
				clearInterval(adoptTimer);
				clearInterval(stopAutoAdopt);
				this.handlePeopleQueue();
			}
		});
	}

	componentDidMount() {
		this.getAllPeople();
		this.getDog();
		this.getCat();
	}

	render() {
		return (
			<>
				<section className="adoption_section">
					<h2 className="adoption_header">Petful Adoption</h2>
					<section className="user_queue">
						<UserQueue
							people={this.state.people}
							handleNewPerson={this.handleNewPerson}
							currentPerson={this.state.currentPerson}
						/>
						<h6 className="message_area">{this.state.message}</h6>
					</section>
					<section className="all_pets">
						<h4>Pets up for Adoption</h4>
						<section className="pets_queue">
							<PetsQueue
								data={this.state.cat}
								canAdopt={this.state.canAdopt}
								handleAdoption={() => {
									this.adopt("cat");
								}}
							/>
						</section>
						<section className="pets_queue">
							<PetsQueue
								data={this.state.dog}
								canAdopt={this.state.canAdopt}
								handleAdoption={() => {
									this.adopt("dog");
								}}
							/>
						</section>
					</section>
				</section>
				<section className="double_adopt">
					{this.state.dog && this.state.cat && this.state.canAdopt && (
						<button
							className="double_adopt_button"
							onClick={this.handleAdoptionBoth}
						>
							Adopt Both Pets
						</button>
					)}
				</section>
			</>
		);
	}
}

export default AdoptionPage;
