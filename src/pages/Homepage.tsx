import {Box} from "@chakra-ui/react"
import { useRef ,useEffect} from "react";
import { Game } from "../scripts/Game";

export default function Homepage({}){
    
useEffect(()=>{

    Game()
},[])
    return <Box mt={100}>


    </Box>
}