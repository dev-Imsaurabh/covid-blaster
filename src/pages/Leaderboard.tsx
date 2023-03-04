import { Box, Heading, Text } from "@chakra-ui/react";

export default function Leaderboard(){

    return <Box>
        <Heading>Leaderboard</Heading>
        
        <Text>{localStorage.getItem("p1")}</Text>
        <Text>{localStorage.getItem("p2")}</Text>
    
    </Box>
}