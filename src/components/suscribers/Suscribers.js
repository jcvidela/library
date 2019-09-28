import React from 'react';
import { Link } from 'react-router-dom';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const Suscribers = (props) => {

	if (!props.suscribers) { return <h2>Loading...</h2>}

  return (
   	<div className="row">
   		
   		<div className="col-md-12 mb-4">
   			<Link
   				to="/suscribers/new"
   				className="btn btn-primary"
   			>Add new suscriber</Link>
   		</div>

   		<div className="col-md-8">
   			<h2>Suscribers</h2>
   		</div>
   		<table className="table table-stripped mt-4">
   			<thead className="text-light bg-primary">
   				<tr>
   					<th>Name</th>
   					<th>Career</th>
   					<th>Direction</th>
   				</tr>
   			</thead>

   			<tbody>
   				{props.suscribers.map(suscriber =>(
   					<tr key={suscriber.id}>
   						<td>{suscriber.name} {suscriber.lastname}</td>
   						<td>{suscriber.career}</td>
   						<td>
   							<Link 
   							to={`/suscribers/${suscriber.id}`} 
   							className="btn btn-success btn-block">
   							Mas informacion

   							</Link>
   						</td>
   					</tr>
   				))}
   			</tbody>
   		</table>

   	</div>
  )
}

export default compose(
	firestoreConnect([{ collection: 'suscribers' }]),
	connect((state, props) =>({
		suscribers: state.firestore.ordered.suscribers
	}))
)(Suscribers);