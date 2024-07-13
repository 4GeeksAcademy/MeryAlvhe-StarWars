import React, { useContext, useState } from "react";
import "../../styles/index.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ContactListEdit = () => {
    const { store, actions } = useContext(Context);

    
    const [name, setName] = useState('');
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [addres, setAdress] = useState();
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        if(name.trim() !==''){
            const dataToSend = {
            name: name,
            email: email,
            phone: phone, 
            addres: addres
        }
        actions.editContact(dataToSend);
        
    }
        navigate('/contact-list')

    }
    const handleCancel = () =>{
        navigate('/contact-list')
    }

    return (
        <div className="container text-center mt-5 mb-5">


            {!store.user ?
                <Spiner/>                :
                <form className="indexFont text-start" onSubmit={handleSubmit}>
                    <h1 className="indexFont"> Edit Contact </h1>

                    <div className="row g-3">
                        <div className="col">
                            <label htmlFor="inputEmail4" className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="First name" aria-label="First name" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                    </div>
                    <form className="row g-3 mt-2">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPhone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="inputPhone" value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={addres} onChange={(event) => setAdress(event.target.value)} />
                        </div>

                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-warning ">Submit</button>
                            <button type="reset" className="btn btn-warning" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </form>
            }
        </div>
    )
}