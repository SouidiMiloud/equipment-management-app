import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import About from './pages/about';
import Details from "./pages/materiel/details";
import Register from './pages/register';
import Reservations from "./pages/materiel/Reservations";
import StudentReservations from "./pages/materiel/studentReservations";

import Students from "./pages/students";
import Contact from './pages/contact';
import MaterielForm from "./pages/materiel/materielForm";
import Materials from "./pages/materiel/materiel.js"
import PrivateRoute from "./pages/privateRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/students" element={<Students/>}/>

        <Route path="/materiel" element={
          <PrivateRoute>
            <Materials />
          </PrivateRoute>
        }/>

        <Route path="/materiel/new" element={<MaterielForm/>}/>
        <Route path="/reservations" element={<Reservations/>}/>
        <Route path="/materiel/details" element={<Details/>}/>
        <Route path="/demandes" element={<StudentReservations/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
