import React, { useContext } from "react";
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";



export const Planets = () => {
    const { store, actions } = useContext(Context);

    const handlePlanet = (id) => {
        actions.settingCurrentPlanet(id)
    }

    const imgError = (event) => {
        event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
    }

    return (
        <div className="container mt-3 mb-3">
            {!store ? <Spinner /> :
                <div className="row">

                    {store.planets.map((item, id) =>
                        <div key={id} className="col-lg-3 col-md-6 col-sm-10 mb-1">
                            <div className="card" >
                                <Link to="/planet-details" onClick={()=> handlePlanet(item.uid)}>
                                <img src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} onError={imgError} className="card-img-top" alt={item.name} />
                                </Link>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-10">
                                            <h5 className="card-title indexFont ">{item.name}</h5>
                                        </div>
                                        <div className="col">
                                            <i className="far fa-star" onClick={()=> actions.addFavorites(item.name)}></i>
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
