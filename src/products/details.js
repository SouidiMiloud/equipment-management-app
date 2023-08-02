import React from "react";
import Navbar from "../Navbar";
import "./details.css"
import arduino from "../images/arduino.jpg"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Details(){
    
    return(
        <div>
            <Navbar/>
            <div className="row">
                <div className="product_img">
                    <img src={arduino}/>
                </div>
                <div className="description">
                    <h3 className="text-info">arduino</h3>
                    <div className="text_desc"></div>
                    <h3 className="text-success">disponible dans 2 jours</h3>
                    <div className="form_div">
                        <label className="label">date de prise</label>
                        <input type="datetime-local" className="reserv_date" placeholder="date de prise"/>
                    </div>
                    <div className="form_div">
                        <label className="label">date de remise</label>
                        <input type="datetime-local" className="reserv_date" placeholder="date de remise"/>
                    </div>
                    <button className="form_btn">reserver</button>
                </div>
            </div>
        </div>
    );
}
export default Details;