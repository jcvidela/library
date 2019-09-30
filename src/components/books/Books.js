import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

//destructing of props (is the same xd)
const Books = ({books, firestore}) => {

	if (!books) { return <Spinner/> }

    const deleteBook = id =>{
   
   //confirm sweet alert
   Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if (result.value) {

      //firestore delete method
      firestore.delete({
         collection: 'books',
         doc: id
      })}
    })
}


  return (
    <div className="row">
    	<div className="col-12 mb-4">
    		<Link to="/books/new" className="btn btn-success">Add book</Link>
    	</div>


    	<table className="table table-stripped mt-4">
    		<thead className="text-light bg-primary">
    			<tr>
    				<th>Title</th>
    				<th>ISBN</th>
    				<th>Publishing house</th>
    				<th>Stock</th>
    				<th>Avaible</th>
    				<th>Actions</th>
    			</tr>
    		</thead>

    		<tbody>
    			{books.map(book =>(
    				<tr key={book.id}>
	    				<td>{book.title}</td>
	    				<td>{book.ISBN}</td>
	    				<td>{book.publishinghouse}</td>
	    				<td>{book.stock}</td>
	    				<td>{book.stock - book.inuse.length}</td>
	    				<td>
	    					<Link to={`/books/see/${book.id}`}
	    					className="btn btn-outline-secondary btn-block">More information</Link>

	    					<button className="btn btn-outline-danger btn-block"
                            onClick={() => deleteBook(book.id)}
                            >Delete</button>
	    				</td>
    			</tr>
    			))}
    		</tbody>
    	</table>
    </div>
  )
}

 Books.propTypes = {
    firestore: PropTypes.object.isRequired,
    books: PropTypes.array
}

export default compose(
	firestoreConnect([{ collection: 'books' }]),
	connect((state, props) =>({
		books: state.firestore.ordered.books
	}))
)(Books);