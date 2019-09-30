import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Swal from 'sweetalert2';

const Suscribers = ({suscribers, firestore}) => {

   //Is visible if suscribers are loading
	if (!suscribers) { return <Spinner/>}

   const deleteSuscriber = id =>{
   
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
         collection: 'suscribers',
         doc: id
      })}
    })
  }

  return (
   	<div className="row">
   		
   		<div className="col-md-12 mb-4">
   			<Link
   				to="/suscribers/new"
   				className="btn btn-success"
   			>Add  suscriber</Link>
   		</div>

   		<table className="table table-stripped mt-4">
   			<thead className="text-light bg-primary">
   				<tr>
   					<th>Name</th>
   					<th>Career</th>
   					<th>Actions</th>
   				</tr>
   			</thead>

   			<tbody>
   				{suscribers.map(suscriber =>(
   					<tr key={suscriber.id}>
   						<td>{suscriber.name} {suscriber.lastname}</td>
   						<td>{suscriber.career}</td>
   						<td>
   							<Link 
   							to={`/suscribers/${suscriber.id}`} 
   							className="btn btn-outline-secondary btn-block">
   							More information

   							</Link>
                        
                        <button className="btn btn-outline-danger btn-block" 
                        onClick={ () => deleteSuscriber(suscriber.id)}>
                           Delete
                        </button>

   						</td>
   					</tr>
   				))}
   			</tbody>
   		</table>

   	</div>
  )
}

Suscribers.propTypes = {
   firestore: PropTypes.object.isRequired,
   suscribers: PropTypes.array
}

export default compose(
	firestoreConnect([{ collection: 'suscribers' }]),
	connect((state, props) =>({
		suscribers: state.firestore.ordered.suscribers
	}))
)(Suscribers);