import { Route,Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Playpage from "../pages/Playpage";
import { Room } from "../pages/room";

export default function AllRoutes(){

    return <Routes>

        <Route path="/"  element={<Homepage />}></Route>
        <Route path="/play"  element={<Playpage />}></Route>
        <Route path="/room"  element={<Room/>}></Route>
    </Routes>
}