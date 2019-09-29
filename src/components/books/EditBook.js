import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'

class EditBook extends Component {

	inputTitle = React.createRef();
	inputISBN = React.createRef();
	inputPublishingHouse = React.createRef();
	inputStock = React.createRef();

	//update changes in firestore
	updateBook = e =>{
		e.preventDefault();

		//create new object
		const updatedBook = {
				title: this.inputTitle.current.value,
				ISBN: this.inputISBN.current.value,
				publishinghouse: this.inputPublishingHouse.current.value,
				stock: this.inputStock.current.value,
			}

		//get firestore and history from props
			const { book, firestore, history } = this.props;
		

		//save on database with firestore
			firestore.update({
				collection: 'books',
				doc: book.id
			}, updatedBook).then(history.push('/'))
		}

    
    render() {

    	//get book to edit
    	const { book } = this.props;

    	if (!book) { return <Spinner/>}

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <h2>Edit book</h2>

                    <div className="col-md-6 mb-4">
                    <Link to="/"
                     className="btn btn-secondary">Back</Link>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                        	<form
                        		onSubmit={this.updateBook}
                        	>
                        		<div className="form-group">
            					<label>Title </label>
            					<input
            						type="text"
            						className="form-control"
            						name="title"
            						placeholder="Enter title of book"
            						defaultValue={book.title}
            						ref={this.inputTitle}
            					></input>
            				</div>

            				<div className="form-group">
            					<label>ISBN </label>
            					<input
            						type="text"
            						className="form-control"
            						name="ISBN"
            						placeholder="Enter ISBN of book"
            						defaultValue={book.ISBN}
            						ref={this.inputISBN}
            					></input>
            				</div>

            				<div className="form-group">
            					<label>Publishing House </label>
            					<input
            						type="text"
            						className="form-control"
            						name="publishinghouse"
            						placeholder="Enter name of publishing house"
            						defaultValue={book.publishinghouse}
            						ref={this.inputPublishingHouse}
            					></input>
            				</div>

            				<div className="form-group">
            					<label>Stock </label>
            					<input
            						type="text"
            						className="form-control"
            						name="stock"
            						placeholder="Enter stock of book"
            						defaultValue={book.stock}
            						ref={this.inputStock}
            					></input>
            				</div>

            				<input 
                                    type="submit"
                                    value="Edit book"
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

 EditBook.propTypes = {
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
)(EditBook)