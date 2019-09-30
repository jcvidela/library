import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'

class EditSuscriber extends Component {

	inputName = React.createRef();
	inputLastName = React.createRef();
	inputCareer = React.createRef();
	inputAlumnCode = React.createRef();

		editSuscriber = e =>{
			e.preventDefault();

			//create object to update
			const updatedSuscriber = {
				name: this.inputName.current.value,
				lastname: this.inputLastName.current.value,
				career: this.inputCareer.current.value,
				alumncode: this.inputAlumnCode.current.value,
			} 

			//get firestore and history from props
			const { suscriber, firestore, history } = this.props;

            if ( this.inputName.current.value.trim() === '' || this.inputLastName.current.value.trim() === '' ||
             this.inputCareer.current.value.trim() === '' || this.inputAlumnCode.current.value.trim() === '' ) {
            return
        }

			//save on database with firestore
			firestore.update({
				collection: 'suscribers',
				doc: suscriber.id
			}, updatedSuscriber).then(history.push('/suscribers'))
			

		}

	render() {

		if (!this.props.suscriber) { return <Spinner/>}

		//edit suscriber in database

		return (
			<div className="row">
                <div className="col-12">

                    <div className="col-md-6 mb-4">
                    <Link to={`/suscribers/${this.props.suscriber.id}`}
                     className="btn btn-secondary">Back</Link>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                        
                            <form
                            	onSubmit={this.editSuscriber}
                            >
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter name"
                                        required
                                        ref={this.inputName}
                                        defaultValue={this.props.suscriber.name}
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
                                        ref={this.inputLastName}
                                        defaultValue={this.props.suscriber.lastname}
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
                                        ref={this.inputCareer}
                                        defaultValue={this.props.suscriber.career}
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
                                        ref={this.inputAlumnCode}
                                        defaultValue={this.props.suscriber.alumncode}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Edit suscriber"
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

 EditSuscriber.propTypes = {
 	firestore: PropTypes.object.isRequired
}

export default compose(
	firestoreConnect(props => [
	{
		collection: 'suscribers',
		storeAs: 'suscriber',
		doc: props.match.params.id
	}
]),
	connect(({ firestore: {ordered}}, props ) =>({
		suscriber: ordered.suscriber && ordered.suscriber[0]
	}))
)(EditSuscriber)