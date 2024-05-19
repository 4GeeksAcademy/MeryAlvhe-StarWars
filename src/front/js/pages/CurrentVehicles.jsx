import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css"

export const CurrentVehicles = () =>{
    const { store, actions} = useContext(Context);

    useEffect(()=>{
        actions.getCurrentVehicles()
    },[])

    return(
        <div className="mt-3">
            {!store.currentVehicles ? <Spinner/> :
            <div className="card mb-3"> 
            <div className="text-end mt-2">
                <Link to="/vehicles">
                <i className="fas fa-times close"></i>
                </Link>
            </div>
                <div className="row g-0">
                    <div className="col-md-4 mb-5 mt-5 imgCard ">
                        <img src={`https://starwars-visualguide.com/assets/img/vehicles/${store.currentVehicleId}.jpg`} className="img-fluid rounded " alt="..."/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body font ms-2">
                            <h1 className="card-title mb-1 indexFont"> {store.currentVehicles.name} </h1>
                            <p className="card-text mt-1"> Model: {store.currentVehicles.name} </p>
                            <p className="card-text"> Manufacturer: {store.currentVehicles.manufacturer} </p>
                            <p className="card-text"> Class: {store.currentVehicles.vehicle_class} </p>
                            <p className="card-text"> Cost: {store.currentVehicles.cost_in_credits} credits</p>
                            <p className="card-text"> Passengers: {store.currentVehicles.passengers}</p>
                            <p className="card-text"> Consumables:{store.currentVehicles.consumables}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}