import React from "react";
import "./App.css"

function Registration(){
    return (
        <div>
            <div class="wrapper">
                <div class="text-center name">
                    inscrivez-vous
                </div>
                <form class="p-3 mt-3">
                    <div class="form-field d-flex align-items-center">
                        <span class="far fa-user"></span>
                        <input type="text" name="firstName" id="firstName" placeholder="prénom"/>
                    </div>
                    <div class="form-field d-flex align-items-center">
                        <span class="fas fa-key"></span>
                        <input type="text" name="lastName" id="lastName" placeholder="nom"/>
                    </div>
                    <div class="form-field d-flex align-items-center">
                        <span class="fas fa-key"></span>
                        <input type="email" name="email" id="email" placeholder="addresse inemail"/>
                    </div>
                    <div class="form-field d-flex align-items-center">
                        <span class="fas fa-key"></span>
                        <input type="password" name="password" id="password" placeholder="mot de passe"/>
                    </div>
                    <div class="form-field d-flex align-items-center">
                        <span class="fas fa-key"></span>
                        <input type="password" name="pwd" id="pwd" placeholder="confirmer mot de passe"/>
                    </div>
                    <div class="form-field d-flex align-items-center">
                        <span class="fas fa-key"></span>
                        <input type="tel" name="phone" id="phone" placeholder="téléphone"/>
                    </div>
                    <a href="/confirm" class="btn mt-3 pt-3"><h4>s'inscrire</h4></a>
                </form>
            </div>
        </div>
    );
}

export default Registration;