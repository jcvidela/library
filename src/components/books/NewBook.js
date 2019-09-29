import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class NewBook extends Component {
 	
 	state = {
 		title: '',
 		ISBN: '',
 		publishinghouse: '',
 		stock: '',
 		inuse: ''
 	}

 	readData = e =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	addBook = e =>{
		e.preventDefault();

		//in error case for .lenght undefined, delete // 
		//newBook.inuse = [];

		//get a copy of state
		const newBook = this.state;

		//get firestore methods
		const { firestore, history } = this.props;

		//validation form
		if (newBook.title.trim() === '' || newBook.ISBN.trim() === '' ||
			newBook.publishinghouse.trim() === ''){ return }

		//add to firestore and redirect
		firestore.add({ collection: 'books'}, newBook)
			.then(() => history.push('/'))
	}

    render() {
        return (
            <div className="row">
            <div className="col-12">
            <h2>New Book</h2>
            	<div className="col-md-6 mb-4">
            		<Link to="/" className="btn btn-primary">Back to books</Link>
            	</div>

            	<div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
            			<form onSubmit={this.addBook}>

            				<div className="form-group">
            					<label>Title </label>
            					<input
            						type="text"
            						className="form-control"
            						name="title"
            						placeholder="Enter title of book"
            						value={this.state.title}
            						onChange={this.readData}
            					></input>
            				</div>

            				<div className="form-group">
            					<label>ISBN </label>
            					<input
            						type="text"
            						className="form-control"
            						name="ISBN"
            						placeholder="Enter ISBN of book"
            						value={this.state.ISBN}
            						onChange={this.readData}
            					></input>
            				</div>

            				<div className="form-group">
            					<label>Publishing House </label>
            					<input
            						type="text"
            						className="form-control"
            						name="publishinghouse"
            						placeholder="Enter name of publishing house"
            						value={this.state.publishinghouse}
            						onChange={this.readData}
            					></input>
            				</div>

            				<div className="form-group">
            					<label>Stock </label>
            					<input
            						type="text"
            						className="form-control"
            						name="stock"
            						placeholder="Enter stock of book"
            						value={this.state.stock}
            						onChange={this.readData}
            					></input>
            				</div>

            				<input 
                                    type="submit"
                                    value="Add book"
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

NewBook.propTypes = {
	firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NewBook) ;
