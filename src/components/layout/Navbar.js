import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
		<nav className="navbar navbar-light">
		<Link to={'/'} className="nav-link">
			<span className="navbar-brand mb-0 h1">Admin library</span>
		</Link>
		</nav>

		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarColor01">
			<ul className="navbar-nav mr-auto">

				<li className="nav-item">
					<Link to={'/suscribers'} className="nav-link">Suscribers</Link>
				</li>
				
				<li className="nav-item">
					<Link to={'/'} className="nav-link">Books</Link>
				</li>							
			</ul>
		</div>
	</nav>
		)
}

export default Navbar;