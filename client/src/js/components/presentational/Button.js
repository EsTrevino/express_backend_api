import React from 'react';

const Button = props => {
	return (
		<button className="btn btn-primary" style={props.style} onClick={props.action}>
			{props.title}
		</button>
	);
};

export default Button;
