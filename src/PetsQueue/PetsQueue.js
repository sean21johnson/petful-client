import React, { Component } from "react";
import "./PetsQueue.css";

class PetsQueue extends Component {
	render() {
		const { data, canAdopt, handleAdoption } = this.props;

		return (
			<>
				<div className="pets_queue_group">
					<div className="pets_queue_item">
						<div className="pet_details">
							<div className="pet_item">
								<img
									className="pet_image"
									src={data.imageURL}
									alt="one of the animals"
								></img>
								<div className="adopt_me_section">
									{data && canAdopt && (
										<button
											className="adopt_me_button"
											onClick={handleAdoption}
										>
											Adopt Me
										</button>
									)}
								</div>
							</div>
							<div className="pet_item pet_description">
								<h5>{data.name}</h5>
								<div>
									<p>Age: {data.age}</p>
									<p>Gender: {data.gender}</p>
									<p>Breed: {data.breed}</p>
									<p>Story: {data.story}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default PetsQueue;
