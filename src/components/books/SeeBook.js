import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class SeeBook extends Component {

  backBook = id =>{
    //extract firestore
    const { firestore } = this.props;

    //copia del libro
    const bookUpdated = { ...this.props.book };

    //delete person
    const loaned = this.props.book.inuse.filter(element => element.alumncode !== id);
    bookUpdated.inuse = loaned;

    //update in firestore
    firestore.update({
      collection: 'books',
      doc: bookUpdated.id
    }, bookUpdated);

  }
    
    render() {

    	//extract book
    	const { book } = this.props
      console.log(book)

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

            <h3 className="my-2">Personas que tienen una copia del libro</h3>
              {
                book.inuse.map(prestado =>(
                <div key={prestado.alumncode} className="card my-2">
                
                  <h4 className="card-header">{prestado.name}  {prestado.lastname}</h4>
                  
                  <div className="card-body">
                    <p>
                      <span className="font-weight-bold">Alumn code:  </span>
                        {prestado.alumncode}
                    </p>

                    <p>
                      <span className="font-weight-bold">Career:  </span>
                        {prestado.career}
                    </p>

                    <p>
                      <span className="font-weight-bold">Date of loan: </span>
                        {prestado.dateSolicited}
                    </p>
                  </div>

                  <div className="card-footer">
                    <div type="button" className="btn btn-success font-weight-bold" onClick={() => this.backBook(prestado.alumncode)}>
                      Back book
                    </div>
                  </div>

                </div>
            ))
                
              }

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
