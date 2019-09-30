import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import DetailSuscriber from '../suscribers/DetailSuscriber';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'

class LoanBook extends Component {


	state = {
		search: '',
		result: {},
		noResult: false
	}

	//find alumn by code
	findAlumn = e =>{
		e.preventDefault();

		//get value
		const { search } = this.state;

		//extract firestore
		const { firestore } = this.props;

		//made query
		const collection = firestore.collection('suscribers');
		const query = collection.where( "alumncode", "==", search ).get();

		//read results
		query.then(result =>{
			if (result.empty) {
				this.setState({
					noResult: true,
					result: {}
				})
			}
			else{
				const data = result.docs[0];
				this.setState({
					result: data.data(),
					noResult: false
				})
			}
		})
	}

	solicitLoan = () =>{
		const suscriber = this.state.result;

		//fecha de alta del prestamo
		suscriber.dateSolicited = new Date().toLocaleDateString();

		//get book
		const bookUpdated = this.props.book;

		//add suscriber to book
		bookUpdated.inuse.push( suscriber );

		//get firestore and history
		const { firestore, history, book } = this.props;

		//save on db
		firestore.update({
			collection: 'books',
			doc: book.id
		},bookUpdated).then(history.push('/'))
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
		const { noResult, result } = this.state;

		let detailAlumn, btnSolicit;

		if (result.name) {

			detailAlumn = <DetailSuscriber 
				alumn={result}
			/>

			btnSolicit = <button type="button" 
			className="btn btn-success btn-block" onClick={this.solicitLoan}
			>Solicit loan</button>
		}
		else{
			detailAlumn = null;
			btnSolicit = null;
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
                    				value="find Alumn"
                    				className="btn btn-success btn-block"
                    			/>
                    		</form>

                    	{/*muestra la ficha del alumno y el boton para solicitar el prestamo*/}
                    	{detailAlumn}
                    	{btnSolicit}

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
	connect(({ firestore: {ordered}}, props ) =>({
		book: ordered.book && ordered.book[0]
	}))
)(LoanBook)
