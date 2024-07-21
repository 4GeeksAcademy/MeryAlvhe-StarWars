import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Spinner } from "../component/Spinner.jsx";
import { Link } from "react-router-dom";
import "../../styles/index.css"

export const CurrentSpecies = ()=>{
    const{ store, actions } = useContext(Context);

    useEffect(()=>{
        actions.getCurrentSpecies()
    },[])


    return(
        <div className="mt-3">
            {!store.currentSpecies ? <Spinner/> :
            <div className="card mb-3"> 
            <div className="text-end mt-2">
                <Link to="/species">
                <i className="fas fa-times close"></i>
                </Link>
            </div>
                <div className="row g-0">
                    <div className="col-md-4 mb-5 imgCard ">
                        <img src={`https://starwars-visualguide.com/assets/img/species/${store.currentSpeciesId}.jpg`} className="img-fluid rounded " alt="..."/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body font">
                            <h1 className="card-title mb-5 indexFont">{store.currentSpecies.name}</h1>
                            <p className="card-text mt-1"> Classifcation: {store.currentSpecies.classification}</p>
                            <p className="card-text"> Designation: {store.currentSpecies.designation} </p>
                            <p className="card-text"> Average height: {store.currentSpecies.average_height} cm </p>
                            <p className="card-text"> Average lifespan: {store.currentSpecies.average_lifespan}  years</p>
                            <p className="card-text"> Language: {store.currentSpecies.language} </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}