import React from 'react';

const DetailSuscriber = ({alumn}) => {
  return (
    <div className="card my-3">
    	<h3 className="card-header bg-primary text-white">Solicitant data</h3>

    	<div className="card-body">
    		<p className="font-weight-bold">Name:
    			<span className="font-weight-normal"> {alumn.name}</span>
    		</p>

    		<p className="font-weight-bold">Alumn code:
    			<span className="font-weight-normal"> {alumn.alumncode}</span>
    		</p>

    		<p className="font-weight-bold">Career:
    			<span className="font-weight-normal"> {alumn.career}</span>
    		</p>
    	</div>
    </div>
  )
}

export default DetailSuscriber;