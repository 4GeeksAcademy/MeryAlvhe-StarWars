import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const CurrentSpecies = ()=>{
    const{ store, actions } = useContext(Context);


    return(
        <div className="mt-3">
            {!store ? <Spinner/> :
            <div className="card mb-3"> 
            <div className="text-end mt-2">
                <Link to="/characters">
                <i className="fas fa-times close"></i>
                </Link>
            </div>
                <div className="row g-0">
                    <div className="col-md-4 mb-5 imgCard ">
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${store.currentUser.uid}.jpg`} className="img-fluid rounded " alt="..."/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body font">
                            <h1 className="card-title mb-5 indexFont">1</h1>
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