import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NewSuscriber extends Component {
   
	state = {
		name : '',
		lastname : '',
		career : '',
		alumncode : ''
	}

	readData = e =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	addSuscriber = e =>{
		e.preventDefault();

		//get state values
		const newSuscriber = {...this.state}

		//get firestore of props
		const { firestore, history } = this.props

		//validation form
		if (this.state.name.trim() === '' || this.state.lastname.trim() === '' ||
			this.state.career.trim() === '' || this.state.alumncode.trim() === '' ){ return }

		//save on database
		firestore.add({ collection: 'suscribers' }, newSuscriber)
			.then(() => history.push('/suscribers'))
	}

	render() {

		return (
			<div className="row">
                <div className="col-12">
                    <h2>New suscriber</h2>

                    <div className="col-md-6 mb-4">
                    <Link to={'/suscribers'} className="btn btn-primary">
                    Back to suscribers</Link>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                        
                            <form
                            	onSubmit={this.addSuscriber}
                            >
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter name"
                                        required
                                        onChange={this.readData}
                                        value={this.state.name}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        placeholder="Enter lastname"
                                        required
                                        onChange={this.readData}
                                        value={this.state.lastname}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Carrera:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="career"
                                        placeholder="Enter career"
                                        required
                                        onChange={this.readData}
                                        value={this.state.career}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Code:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="alumncode"
                                        placeholder="Enter code"
                                        required
                                        onChange={this.readData}
                                        value={this.state.alumncode}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Add suscriber"
                                    className="btn btn-success"
                                />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

NewSuscriber.propTypes = {
	firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NewSuscriber) ;
