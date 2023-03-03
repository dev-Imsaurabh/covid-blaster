import { Box } from "@chakra-ui/react";
import "./homepage.css"


export const Room = () => {
    return (
        <Box className="home">

       <img src="https://media.giphy.com/media/JmUd8L6SMdTrriXSEc/giphy.gif"/>
       
        <div className="homeButtons">
            <p>Your room ID: </p>
            <form action="">
                    <input className="player" type="number" placeholder="Add player ID"/>
                </form>
            <div>
            <a href=""><button className="button-85">ADD PLAYER</button></a>
             </div>
            
        </div>
        </Box>
    )
}