import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";

export const ContactList = () => {

    const { store, actions } = useContext(Context);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const handleSubmitUser = (event)=>{
        event.preventDefault();
        if(user.trim()!==' '){
            actions.addUser(user)
        }
    }

    const  handleEditUser = (id) =>{
        actions.settingCurrentContact(id)
        navigate('/contact-list-edit')
    }

    const handleDelete = (id) => {
        actions.deleteContact(id)
    }

    return (
        <div className="container text-center mt-5 mb-5">
            {
                !store.user ? <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmitUser}>
                    <h1 className="indexFont">Create your phonebook</h1>
                    <div className="col">
                        <input type="text" className="form-control indexFont" id="autoSizingInput" placeholder="Phonebook name" value={user} onChange={(event) => setUser(event.target.value)} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-warning indexFont">Submit</button>
                    </div>
                </form> :
                    <div>

                        <h1 className="indexFont"> Contact List </h1>
                        <ul className="list-group font text-dark">
                            {store.contacts.map((item, id) =>
                                <li className="list-group-item list-group-item-warning d-flex justify-content-between align-items-end" key={id}>
                                    {item.name}
                                    <div className="col-1">
                                    <i className="fa-solid fa-pen me-4" onClick={() => handleEditUser(item.id)}></i>
                                    <i className="fas fa-trash" onClick={() => handleDelete(item.id)}></i>
                                    </div>

                                </li>

                            )}
                        </ul>
                        <div className="text-end mt-2 ">

                            <Link to='/contact-list-form' type="button" className="btn btn-warning btn-sm font"> Add new a contact </Link>
                        </div>
                    </div>
            }

        </div>
    )
}