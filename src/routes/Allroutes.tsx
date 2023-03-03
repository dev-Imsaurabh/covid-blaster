import { Route,Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Playpage from "../pages/Playpage";

export default function AllRoutes(){

    return <Routes>

        <Route path="/"  element={<Homepage />}></Route>
        <Route path="/play"  element={<Playpage />}></Route>


    </Routes>
}