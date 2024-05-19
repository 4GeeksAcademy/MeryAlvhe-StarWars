import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const ContactList = () => {

    const { store, actions } = useContext(Context);

    const handleDelete =(id)=>{
            actions.deleteContact(id)
    }

    return (
        <div className="container text-center mt-5 mb-5">
            <h1 className="indexFont"> Contact List </h1>
            <ul className="list-group font text-dark">
               {store.contacts.map((item, id)=>
            <li className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center" key={id}>
                    {item.name}
                    <i className="fas fa-trash" onClick={()=> handleDelete(item.id)}></i>
                </li>
                
            )} 
            </ul>
            <div className="text-end mt-2 ">

            <Link to='/contact-list-form'  type="button" className="btn btn-warning btn-sm font"> Add new a contact </Link>
            </div>

        </div>
    )
}