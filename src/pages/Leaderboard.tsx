import { Box, Button, Container, Heading, Image, Table, Td, Text, Th, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/button.css"

export default function Leaderboard(){

    const [winner,setWinner] = useState("");
    const nav = useNavigate()

    let score1 = localStorage.getItem("p1");
    let score2 = localStorage.getItem("p2")

    // if(Number(score1) > Number(score2)){
    //       setWinner("Player1 Wins")
    // }else if(Number(score1) < Number(score2)){
    //     setWinner("Player1 Wins")
    // }else{
    //     setWinner("Tie")
    // }

    const handleClick = () => {
        nav("/")
    }

    return <Box>
        <Heading fontSize="80px" mt="50px">GAME OVER</Heading>
        {/* <Heading>Leaderboard</Heading> */}
        <Container>
            <Image src=""/>
        <Text fontSize={"40px"} mt="50px">{"Player1 Wins"}</Text>
        </Container>

        <Table width={"500px"} h="200px" border="1px solid white" margin={"auto"} mt="40px">
            <Tr>
                <Td>Name</Td>
                <Td>Score</Td>
                <Td>Player ID</Td>
            </Tr>
            <Tr>
                <Td>Player1</Td>
                <Td>{score1}</Td>
                <Td>1234</Td>
            </Tr>

            <Tr>
                <Td>Player2</Td>
                <Td>{score2}</Td>
                <Td>12345</Td>
            </Tr>
           

        </Table>

        <Button className="button-85" mt={"80px"} onClick={()=>handleClick()}>Go to home</Button>
    
    </Box>
}