import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import DetailSuscriber from '../suscribers/DetailSuscriber';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'

import { findUser } from '../../actions/findeUserActions';


class LoanBook extends Component {


	state = {
		search: '',
		noResult: false
	}

	//find alumn by code
	findAlumn = e =>{
		e.preventDefault();

		//get value
		const { search } = this.state;

		//extract firestore
		const { firestore, findUser } = this.props;

		//made query
		const collection = firestore.collection('suscribers');
		const query = collection.where( "alumncode", "==", search ).get();

		//read results
		query.then(result =>{
			if (result.empty) {

				findUser({})
				this.setState({
					noResult: true
				})
			}
			else{

				const data = result.docs[0];

				findUser(data.data())
				
				this.setState({
					noResult: false
				})
			}
		})
	}

	solicitLoan = () =>{
		const { user } = this.props;

		//fecha de alta del prestamo
		user.dateSolicited = new Date().toLocaleDateString();

		//get a copy state and push new state
		let inuse = [];
        inuse = [...this.props.book.inuse, user];

		const book = {...this.props.book};

		delete book.inuse;

		book.inuse = inuse;

		const { firestore, history } = this.props;


		firestore.update({
            collection: 'books',
            doc: book.id
        }, book ).then(history.push('/'));
		
	}

	//set alumncode in state
	readData = e =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}


	render() {

		//extract book
		const { book } = this.props;

		if (!book) { return <Spinner/> }

		//extract detail suscriber
		const { user } = this.props;

		let detailAlumn, btnSolicit;

		if (user.name) {

			detailAlumn = <DetailSuscriber 
				alumn={user}
			/>

			btnSolicit = <button type="button" 
			className="btn btn-success btn-block" onClick={this.solicitLoan}
			>Solicit loan</button>
		}
		else{
			detailAlumn = null;
			btnSolicit = null;
		}
		const { noResult } = this.state;
		let messageError = '';
		if (noResult) {
			messageError = <div className="alert alert-danger text-center">No hay resultados para el codigo ingresado</div>
		}
		else{
			messageError = null;
		}

		return (
			<div className="row">
				<div className="col-12 mb-4">

					<div className="col-md-6 mb-4">
                    	<Link to={`/books/see/${book.id}`}
                    	 className="btn btn-secondary">Back</Link>
                    </div>

                    <h2>Get book: {book.title}</h2>

                    <div className="row justify-content-center">
                    	<div className="col-md-8">
                    		<form onSubmit={this.findAlumn} className="mb-4">
                    			<legend className="color-primary text-center">
                    				Find suscriber from alumncode
                    			</legend>
                    		

                    		<div className="form-group">
                    			<input
                    				type="text"
                    				name="search"
                    				className="form-control"
                    				onChange={this.readData}
                    			/>
                    		</div>

                    			<input
                    				type="submit"
                    				value="Submit"
                    				className="btn btn-success btn-block"
                    			/>
                    		</form>

                    	{/*muestra la ficha del alumno y el boton para solicitar el prestamo*/}
                    	{detailAlumn}
                    	{btnSolicit}

                    	{messageError}

                    	</div>
                    </div>
				</div>
			</div>
		);
	}
}

 LoanBook.propTypes = {
 	firestore: PropTypes.object.isRequired
}

export default compose(
	firestoreConnect(props => [
	{
		collection: 'books',
		storeAs: 'book',
		doc: props.match.params.id
	}
]),
	connect(({ firestore: {ordered}, user}, props ) =>({
		book: ordered.book && ordered.book[0],
		user: user
	}), { findUser } )
)(LoanBook)
