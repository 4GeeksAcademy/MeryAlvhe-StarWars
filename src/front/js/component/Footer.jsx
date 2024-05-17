import React, { Component } from "react";

export const Footer = () => {
	return (
		<div className="container-fluid border-top border-warning mt-auto">
		<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 ">
			<div className="col-md-4 d-flex align-items-center">
				<span className="mb-3 mb-md-0 text-warning"> Desing and Developed by MeryAlvhe © 2024 </span>
			</div>
			<ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
				<li className="ms-3"><a className="text-warning" href="#"><i className="fas fa-envelope fs-5"></i></a></li>
				<li className="ms-3"><a className="text-warning" href="#"><i className="fab fa-linkedin fs-5"></i></a></li>
				<li className="ms-3"><a className="text-warning" href="#"><i className="fab fa-github fs-5 "></i></a></li>
			</ul>
			
		</footer>
	
		</div>
	)
}
