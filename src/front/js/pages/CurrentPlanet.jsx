import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CurrentPlanet = ()=>{
    const { store, actions} = useContext(Context)

    const imgError = (event) => {
        event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
    }

    useEffect(()=>{
       actions.getCurrentPlanet();
       
    },[])

    return (
        <div className="mt-3">
            {!store.currentPlanet ? <Spinner/> :
            <div className="card mb-3"> 
            <div className="text-end mt-2">
                <Link to="/planets">
                <i className="fas fa-times close"></i>
                </Link>
            </div>
                <div className="row g-0">
                    <div className="col-md-4 mb-5 imgCard ">
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanetId}.jpg`} onError={imgError} className="img-fluid rounded " alt={store.currentPlanet.name}/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body font">
                            <h1 className="card-title mb-5 indexFont">{store.currentPlanet.name}</h1>
                            <p className="card-text mt-1"> Diameter: {store.currentPlanet.diameter} </p>
                            <p className="card-text"> Population: {store.currentPlanet.population} </p>
                            <p className="card-text"> Climate: {store.currentPlanet.climate}</p>
                            <p className="card-text"> Terrain: {store.currentPlanet.terrain} </p>
                            <p className="card-text"> Rotation period: {store.currentPlanet.rotation_period}</p>                           
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}