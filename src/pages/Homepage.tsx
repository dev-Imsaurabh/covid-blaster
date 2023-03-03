import {Box} from "@chakra-ui/react"
import { useRef ,useEffect} from "react";
import { Game } from "../scripts/Game";
import "./homepage.css";
import "../styles/button.css"



export default function Homepage({}){
    const id = 123456

    const handleClick = () => {
         
    }
    
// useEffect(()=>{

//     Game()
// },[])
    return <Box className="home">

       <img src="https://media.giphy.com/media/JmUd8L6SMdTrriXSEc/giphy.gif"/>
       
        <div className="homeButtons">
            <p>Your room ID: {id}</p>
            <img src="https://media3.giphy.com/media/dJezVlwfVulTykjRQj/giphy.gif?cid=ecf05e47bo36cie802msre03aopsq2y9zjr0d9s3bvb8wri1&rid=giphy.gif&ct=g"></img>
            <div>
            <a href="https://my-app-rose-six.vercel.app/room"><button className="button-85" onClick={()=>handleClick()}>CREATE A ROOM</button></a>
                <a href="https://my-app-rose-six.vercel.app/play"><button className="button-85" onClick={()=>handleClick()}>JOIN A ROOM</button></a>
             </div>
            
        </div>
       
    </Box>
}