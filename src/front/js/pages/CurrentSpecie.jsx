import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Spinner } from "../component/Spinner.jsx";
import { Link } from "react-router-dom";

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
                            <p className="card-text mt-1"> 1 </p>
                            <p className="card-text">2 </p>
                            <p className="card-text">Mass: </p>
                            <p className="card-text">Hair color: </p>
                            <p className="card-text">Skin color: </p>
                            <p className="card-text">Gender: </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}