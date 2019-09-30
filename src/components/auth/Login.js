import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class Login extends Component {

	state = {
		email: '',
		password: ''
	}

	initSession = e =>{
		e.preventDefault();

		const { firebase } = this.props;

		const { email, password } = this.state;

		firebase.login({
			email,
			password
		})
		.then(result => console.log('user logged'))
		.catch(error => console.log('existing error'))
	}

	readData = e =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                Login
                            </h2>

                            <form onSubmit={this.initSession}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.readData}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password:</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        placeholder="Enter password"
                                        value={this.state.password}
                                        onChange={this.readData}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
	firebase: PropTypes.object.isRequired
}

export default firebaseConnect()( Login );
