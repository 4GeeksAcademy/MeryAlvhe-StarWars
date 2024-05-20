import React, { useContext } from "react";
import { Spinner } from "../component/Spinner.jsx";
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";
import "../../styles/index.css"

export const Characters = () => {
    const { store, actions } = useContext(Context);

   const handlEye = (user) => {
        actions.settingUser(user)
    }

    const handleCharacter = (parameter) =>{
        console.log(parameter)
        actions.settingCurrentUser(parameter)
    } 


    return (
        <div className="container mt-3 mb-3">
            {!store ? <Spinner /> :
                <div className="row">

                    {store.characters.map((item, id) =>
                        <div key={id} className="col-lg-3 col-md-6 col-sm-10 mb-1">
                            <div className="card" >
                                <Link to="/characters-details" onClick={()=> handleCharacter(item.url)}>
                                    <img src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} className="card-img-top" alt={item.name} />
                                </Link>
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-10">
                                            <h5 className="card-title indexFont ">{item.name}</h5>
                                        </div>
                                        <div className="col">
                                            { store.favorites.includes(item.name) ? <i className="fas fa-star text-warning"  onClick={()=> actions.removeFavorites(item.name)}></i>
                                            :
                                            <i className="far fa-star favorite"  onClick={()=> actions.addFavorites(item.name)}></i>
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