import React, { useContext } from "react";
import { Context } from '../store/appContext.js';
import { Spinner } from "../component/Spinner.jsx";
import { Link } from "react-router-dom";

export const Vehicles = () => {
    const { store, actions } = useContext(Context);

    const handleVehicle = (id) => {
        actions.settingCurrentVehicles(id)
    }

    return (
        <div className="container mt-3 mb-3">
            {!store ? <Spinner /> :
                <div className="row">

                    {store.vehicles.map((item, id) =>
                        <div key={id} className="col-lg-3 col-md-6 col-sm-10 mb-1">
                            <div className="card" >
                                <Link to="/vehicle-details" onClick={() => handleVehicle(item.uid)}>
                                    <img src={`https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`} className="card-img-top" alt={item.name} />
                                </Link>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-10">
                                            <h5 className="card-title indexFont ">{item.name}</h5>
                                        </div>
                                        <div className="col">
                                            {store.favorites.includes(item.name) ? <i className="fas fa-star text-warning" onClick={() => actions.removeFavorites(item.name)}></i>
                                                :
                                                <i className="far fa-star favorite" onClick={() => actions.addFavorites(item.name)}></i>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}