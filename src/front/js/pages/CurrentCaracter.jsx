import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Spinner } from "../component/Spinner.jsx";
import { Link } from "react-router-dom";
import "../../styles/index.css"

export const CurrentCharacter = () => {
    const {store, actions} = useContext (Context);

    useEffect(()=>{
        actions.getCurrentUser()
    },[])

    /* console.log(store.currentUserProperties) */

    return (
        <div className="mt-3">
            {!store.currentUser ? <Spinner/> :
            <div className="card mb-3"> 
            <div className="text-end mt-2">
                <Link to="/characters">
                <i className="fas fa-times close"></i>
                </Link>
            </div>
                <div className="row g-0">
                    <div className="col-md-4 mb-5 imgCard ">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${store.currentUser.uid}.jpg`} className="img-fluid rounded " alt="..."/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body font">
                            <h1 className="card-title mb-5 indexFont">{store.currentUserProperties.name}</h1>
                            <p className="card-text mt-1"> Birth year: {store.currentUserProperties.birth_year}</p>
                            <p className="card-text">Height: {store.currentUserProperties.height}</p>
                            <p className="card-text">Mass: {store.currentUserProperties.mass}</p>
                            <p className="card-text">Hair color: {store.currentUserProperties.hair_color}</p>
                            <p className="card-text">Skin color: {store.currentUserProperties.skin_color}</p>
                            <p className="card-text">Gender: {store.currentUserProperties.gender}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}