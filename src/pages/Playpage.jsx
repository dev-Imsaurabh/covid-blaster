import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  ABSOLUTE,
  AUTO,
  COLUMN,
  FILL_25PARENT,
  FILL_75PARENT,
  FILL_90PARENT,
  FILL_PARENT,
  GREEN,
  LARGE,
  START,
} from "../constants/constants";
import { Game } from "../scripts/Game";
import laser_cannon from "../assets/laser_cannon.mp3";
import blaster from "../assets/blaster.mp3";
import destroyed from "../assets/destroyed.mp3";
import { ChatBar } from "../components/ChatBar";

export default function Playpage() {
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(true);
  const [value, setValue] = useState("");
  const [chats, setChats] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io.connect("wss://covid-blaster-game.onrender.com/");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on("receive_message", (data) => {
      if (data.value) {
        setChats((prev) => {
          console.log(data)
          if (prev) {
            return [...prev, data.value];
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (active) {
      try {
        let audio = new Audio();
        audio.src = blaster;
        audio.play();
      } catch (error) {}
    }
  }, [score]);
   

  useEffect(()=>{
    
    if(chats?.length>4){
      setChats((prev) => prev.slice(1))
    }
      
  },[chats])

  useEffect(() => {
    window.document.body.style.overflow = "hidden";
  }, []);


  return (
    <Flex m={AUTO} w={FILL_90PARENT}>
      <Box w={FILL_75PARENT}>{Game({ setScore, setActive })}</Box>
      <VStack h={"100vh"} position={ABSOLUTE} top={2} right={4} w={FILL_25PARENT}>
        <VStack>
          <HStack>
            <Badge fontSize={LARGE} colorScheme={GREEN}>
              Your Score: {score}
            </Badge>
          </HStack>

          <Heading mt={20}>Realtime Leaderboard</Heading>

          <VStack>
            {/* //players leaderborad */}
          </VStack>

          <VStack w={FILL_PARENT} position={ABSOLUTE} bottom={10} mt={100}>
            <Flex w={FILL_PARENT} justifyContent={START} direction={COLUMN} gap={2}>
              {chats?.map((el) => (
                <ChatBar chat={el}/>
              ))}
            </Flex>
            <HStack>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Let's chat"
              ></Input>
              <Button
                onClick={() => {
                  socketRef.current.emit("send_message", { value });
                  console.log(socketRef.current)
                  if(value!=""){
                    setChats((prev)=>[...prev,value])
                  }
                  setValue("");
                }}
              >
                Send
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
}
