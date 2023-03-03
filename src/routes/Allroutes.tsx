import { Route,Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import { Room } from "../pages/room";

export default function AllRoutes(){

    return <Routes>

        <Route path="/"  element={<Homepage />}></Route>
        <Route path="/room"  element={<Room/>}></Route>
    </Routes>
}