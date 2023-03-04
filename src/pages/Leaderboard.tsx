import { Box, Button, Container, Heading, Image, Table, Td, Text, Th, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/button.css"
import {useEffect} from "react"

export default function Leaderboard(){

    const [winner,setWinner] = useState("");
    const nav = useNavigate()

    let score1 = localStorage.getItem("p1");
    let score2 = localStorage.getItem("p2")

    

    useEffect(()=>{
        if(Number(score1) > Number(score2)){
            setWinner("You Won")
      }else if(Number(score1) < Number(score2)){
          setWinner("Player 2 Won")
      }else{
          setWinner("Tie")
      }

    },[])

    const handleClick = () => {
        nav("/")
    }


    return <Box>
        <Heading fontSize="80px" mt="80px">GAME OVER</Heading>
        {/* <Heading>Leaderboard</Heading> */}
        <Container>
            <Image src=""/>
        {/* <Text fontSize={"40px"} mt="50px">{"Player1 Wins"}</Text> */}
        </Container>
        <Heading>{winner}</Heading>

        <Table width={"500px"} h="200px" border="1px solid white" color={"black"} fontWeight="700" fontSize={"25px"} margin={"auto"} mt="40px">
            <Tr>
                <Th>Players</Th>
                <Th>Scores</Th>
            </Tr>
            <Tr>
                <Td>You</Td>
                <Td>{score1}</Td>
            </Tr>

            <Tr>
                <Td>Player 2</Td>
                <Td>{score2}</Td>
            </Tr>
           

        </Table>

        <Button className="button-85" mt={"80px"} mb="110px" fontSize={"25px"} p="30px 20px" onClick={()=>handleClick()}>Go to home</Button>
    
    </Box>
}