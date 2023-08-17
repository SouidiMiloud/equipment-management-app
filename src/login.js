import React from "react";
import "./App.css"
import logoImg from "./logo.png"

function Login(){
    
    return (
        <div>
            <div class="wrapper">
                <div class="logo">
                    <img src={logoImg} alt=""/>
                </div>
                <div class="text-center name">
                    Connectez-vous
                </div>
                <form class="p-3 mt-3">
                    <div class="form-field d-flex align-items-center">
                        <span class="far fa-user"></span>
                        <input type="email" name="userName" id="userName" placeholder="Username"/>
                    </div>
                    <div class="form-field d-flex align-items-center">
                        <span class="fas fa-key"></span>
                        <input type="password" name="password" id="pwd" placeholder="Password"/>
                    </div>
                    <button class="btn mt-3 pt-3"><h4>se connecter</h4></button>
                </form>
                <div class="text-center fs-6">
                    <a href="#"><h5>mot de passe oublié?</h5></a> ou <a href="/register"><h5>s'inscrire</h5></a>
                </div>
            </div>
        </div>
    );
}

export default Login