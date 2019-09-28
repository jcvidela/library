import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
//redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const SeeSuscriber = (props) => {

	if (!props.suscriber) { return <Spinner/> }

  return (
   	<div className="row">
   		<div className="col-md-6 mb-4">

   			<Link to={'/suscribers'} className="btn btn-secondary">
   				Back to suscribers</Link>
   			</div>

   			<div className="col-md-6">
   				<Link to={`/suscribers/edit/${props.suscriber.id}`} className="btn btn-primary float-right">
   					Edit suscriber
   				</Link>
   			</div>

   			<hr className="mx-5 w-100"/>

   			<div className="col-12">

   				<h2 className="mb-4">
   					{props.suscriber.name} {props.suscriber.lastname}
   				</h2>

   				<p>
   					<span className="font-weight-bold">Career:  </span>
   					{props.suscriber.career}
   				</p>

   				<p>
   					<span className="font-weight-bold">Alumn code:  </span>
   					{props.suscriber.alumncode}
   				</p>

   			</div>
   	</div>
  )
}

SeeSuscriber.propTypes = {
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
)(SeeSuscriber)