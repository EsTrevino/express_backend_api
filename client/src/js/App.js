import React, { Component } from 'react';
import FormContainer from './components/container/FormContainer';

class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="container jumbotron">
				<FormContainer />
			</div>
		);
	}
}

export default App;
