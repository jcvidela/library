import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class SeeBook extends Component {
    
    render() {

    	//extract book
    	const { book } = this.props

    	if (!book) { return <Spinner/> }

    	//btn get book
    	let btnLoan;

    	if (book.stock - book.inuse.length > 0) {
    		btnLoan = <Link to={`/books/Loan/${book.id}`}
    		className="btn btn-success my-3">Get book</Link>
    	}
    	else{
    		btnLoan = null;
    	}

        return (
            <div className="row">
            	<div className="col-md-6 mb-4">
            		<Link to="/" className="btn btn-secondary">Back to list</Link>
            	</div>

            	<div className="col-md-6 mb-4">
            		<Link to={`/books/edit/${book.id}`} 
            		className="btn btn-primary float-right">
            			Edit book
            		</Link>
            	</div>

            	<hr className="mx-5 w-100"/>

            	<div className="col-12">
            		<h2 className="mb-4">{book.title}</h2>

            		<p>
   						<span className="font-weight-bold">ISBN:  </span>
   						{book.ISBN}
   					</p>

   					<p>
   						<span className="font-weight-bold">Publishing house:  </span>
   						{book.publishinghouse}
   					</p>

   					<p>
   						<span className="font-weight-bold">Stock:  </span>
   						{book.stock}
   					</p>

   					<p>
   						<span className="font-weight-bold">Avaible:  </span>
   						{book.stock - book.inuse.length}
   					</p>

   					{btnLoan}

            	</div>
            </div>
        );
    }
}

SeeBook.propTypes = {
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
)(SeeBook)
