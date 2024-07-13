import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Species } from "./pages/Species.jsx";
import { Vehicles } from "./pages/Vehicles.jsx";
import { Planets } from "./pages/Planets.jsx";
import { CurrentCharacter } from "./pages/CurrentCaracter.jsx";
import { ContactList } from "./pages/ContactList.jsx";
import { ContactListForm } from "./pages/ContactListForm.jsx";
import { CurrentPlanet } from "./pages/CurrentPlanet.jsx";
import { CurrentSpecies } from "./pages/CurrentSpecie.jsx";
import { CurrentVehicles } from "./pages/CurrentVehicles.jsx";
import { Login } from "./pages/Login.jsx";
import { ContactListEdit } from "./pages/ContactListEdit.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Characters/>} path= "/characters"/>
                        <Route element={<Species/>} path="/species"/>
                        <Route element={<Vehicles/>} path="/vehicles"/>
                        <Route element={<Planets/>} path="/planets"/>
                        <Route element={<ContactList/>} path="/contact-list"/>
                        <Route element={<CurrentCharacter/>} path='/characters-details/' />
                        <Route element={<CurrentPlanet/>} path='/planet-details'/>
                        <Route element={<CurrentSpecies/>} path='/species-details'/>
                        <Route element={<CurrentVehicles/>} path='/vehicle-details'/>
                        <Route element={<ContactListForm/>} path='/contact-list-form' />
                        <Route element={<ContactListEdit/>} path='/contact-list-Edit' />
                        <Route element={<Login/>} path='/login' />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
