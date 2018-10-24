import React, { Component } from 'react';
import Input from '../presentational/Input.js';
import Button from '../presentational/Button.js';
import axios from 'axios';

class FormContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleFormSubmit(e) {
		e.preventDefault(e);
		//form subcomission here
		console.log(this.state);
		axios({
			method: 'post',
			url: 'http://localhost:3000/user/signup',
			data: {
				email: this.state.email,
				password: this.state.password
			}
		}).then(response => {
			console.log(response);
		});
	}

	handleInputChange(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState({
			[name]: value
		});
	}

	handleClearForm() {
		//form clear here
		console.log('test');
	}

	render() {
		return (
			<div className="container">
				<form className="form-group" onSubmit={this.handleFormSubmit}>
					<Input
						type={'text'}
						name={'email'}
						title={'Email:'}
						value={this.state.email}
						changeHandler={this.handleInputChange}
					/>
					<Input
						type={'text'}
						name={'password'}
						title={'Password:'}
						value={this.state.password}
						changeHandler={this.handleInputChange}
					/>
					<Button onClick={this.handleFormSubmit} title={'Submit'} />
				</form>
			</div>
		);
	}
}

export default FormContainer;
