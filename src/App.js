import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomeComponent from './home';
import Login from './login'
import Registration from './registration'
import MailConfirmation from './mailConfirmation'
import Contact from './contact';
import About from './about';
import Materials from './products/materials';
import Details from "./products/details";
import ProductListing from './products/productlisting';

function App(){
  return(
    /*<BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent/>}></Route>
        <Route path="/login" element ={<Login/>}></Route>
        <Route path="/register" element={<Registration/>}></Route>
        <Route path="/confirm" element={<MailConfirmation/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/materials" element={<Materials/>}></Route>
        <Route path="/ProductListing" element={<ProductListing />}></Route>
      </Routes>
    </BrowserRouter>*/

    <Details/>
        
  );
}

export default App;