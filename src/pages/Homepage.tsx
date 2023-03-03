import {Box} from "@chakra-ui/react"
import { useRef ,useEffect} from "react";
import { Game } from "../scripts/Game";
import "./homepage.css";
import "../styles/button.css"

export default function Homepage({}){
    
// useEffect(()=>{

//     Game()
// },[])
    return <Box className="home">

       <img src="https://media.giphy.com/media/JmUd8L6SMdTrriXSEc/giphy.gif"/>
       
        <div className="homeButtons">
            <p>Your room ID: 1234567</p>
            <div>
                <button className="button-85">CREATE A ROOM</button>
                <button className="button-85">JOIN A ROOM</button>
             </div>
            
        </div>
       
    </Box>
}