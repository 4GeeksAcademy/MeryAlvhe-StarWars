import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => (
	<div id="carouselExample" className="carousel slide">
		<div className="carousel-inner carrousel w-100 ">
			<div className="carousel-item active">
				<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/826040f5-466d-4fe5-ad72-dbcdfd174c26/db3lu2w-e9082aba-238d-4f06-a918-319f0d74a5a0.png/v1/fill/w_1192,h_670,q_70,strp/star_wars__the_force_awakens_wallpaper_by_spirit__of_adventure_db3lu2w-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvODI2MDQwZjUtNDY2ZC00ZmU1LWFkNzItZGJjZGZkMTc0YzI2XC9kYjNsdTJ3LWU5MDgyYWJhLTIzOGQtNGYwNi1hOTE4LTMxOWYwZDc0YTVhMC5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.cehWhRJKv9F0n0a1szHyeaNKPWnM1rtbHZjs0Nq-Whw" className="d-block w-100" alt="..."/>
			</div>
			<div className="carousel-item">
				<img src="https://lumiere-a.akamaihd.net/v1/images/star_wars_2013c877.jpeg?region=0,0,1920,1080" className="d-block w-100" alt="..."/>
			</div>
			<div className="carousel-item">
				<img src="https://i.blogs.es/2cc78a/ordenstarwars/1366_2000.jpg" className="d-block w-100" alt="..."/>
			</div>
		</div>
		<button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
			<span className="carousel-control-prev-icon" aria-hidden="true"></span>
			<span className="visually-hidden">Previous</span>
		</button>
		<button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
			<span className="carousel-control-next-icon" aria-hidden="true"></span>
			<span className="visually-hidden">Next</span>
		</button>
	</div>
);

