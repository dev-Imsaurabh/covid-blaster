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
  Text,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/config";

const obj = {};

export default function Playpage() {
  let nav = useNavigate();

  const [score, setScore] = useState(0);
  const [active, setActive] = useState(true);
  const [value, setValue] = useState("");
  const [chats, setChats] = useState([]);
  const socketRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const [room, setRoom] = useState({});
  const [maker, setMaker] = useState("");
  const [leaderboard, setLeaderBoard] = useState(obj);
  const [player, setPlayer] = useState("");
  const [player2, setPlayer2] = useState("");
  const [p2Score,setP2Score] = useState(0)
  const [over,setOver] = useState(false)
 
  useEffect(() => {
    socketRef.current = io.connect("wss://covid-blaster-game.onrender.com/");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useState(() => {
    if (localStorage.getItem("start") == null) {
      localStorage.setItem("start", 0);
    } else {
      if (localStorage.getItem("start") == 1) {
      } else {
      }
    }
  }, []);

  useEffect(() => {
    socketRef.current.on("receive_message", (data) => {
      if (data.value) {
        setChats((prev) => {
          console.log(data);
          if (prev) {
            return [...prev, data.value];
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("rid") == null) {
      nav("/room");
    }
    console.log(sessionStorage.getItem("rid"));
  }, []);

  useEffect(() => {
    socketRef.current.on(sessionStorage.getItem("rid"), (data) => {

      if(data.start){
        localStorage.setItem("start",1)
        window.location.reload()
        console.log("60 sec timer")
      }else{
        setP2Score(data.score)
      }

      console.log(data)
    
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
    if(localStorage.getItem("userId")==maker.id){
      socketRef.current.emit("score", {
        rid: sessionStorage.getItem("rid"),
        score:score
      });

    }else{

      socketRef.current.emit("score1", {
        rid: sessionStorage.getItem("rid"),
        score:score
      });

    }
     
  }, [score]);

  useEffect(() => {
    if (chats?.length > 4) {
      setChats((prev) => prev.slice(1));
    }
  }, [chats]);

  useEffect(() => {
    window.document.body.style.overflow = "hidden";
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      socketRef.current.emit("send_message", { value });
      if (value !== "") {
        setChats((prev) => [...prev, value]);
      }
      setValue("");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("start") == 1) {
      let id = setInterval(() => {
        setTimer((prev) => {
          if (prev == 20) {
            localStorage.setItem("start", 0);
            setOver(true)
            clearInterval(id);
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }
  }, []);

  useEffect(()=>{
    if(over==true){
      window.location.href ="https://my-app-rose-six.vercel.app/results"
    }

  },[over])

  useEffect(()=>{

    localStorage.setItem("p1",score)
    localStorage.setItem("p2",p2Score)

  },[score,p2Score])

  // console.log(timer)

  useEffect(() => {
    let getRoom = async () => {
      let res = await axios({
        method: "get",
        url: BASE_URL + `/room/${sessionStorage.getItem("rid")}`,
      });
      console.log(res);

      if (res.data.status == 1) {
        setMaker(JSON.parse(res.data.data.p1));
        setPlayer2(JSON.parse(res.data.data.p2));
        console.log(JSON.parse(res.data.data.p2));
        setRoom(res.data.data);
        if (
          JSON.parse(res.data.data.p1)?.id == localStorage.getItem("userId")
        ) {
          setPlayer("p1");
        }
        if (
          JSON.parse(res.data.data.p2)?.id == localStorage.getItem("userId")
        ) {
          setPlayer("p2");
        }
    
        
      } else {
      }
    };

    getRoom();
  }, []);

  // console.log(player);

  return (
    <Flex m={AUTO} w={FILL_90PARENT}>
      <Box w={FILL_75PARENT}>{Game({ setScore, setActive, active })}</Box>
      <VStack
        h={"100vh"}
        position={ABSOLUTE}
        top={2}
        right={4}
        w={FILL_25PARENT}
      >
        <VStack>
          <HStack>
            <Badge fontSize={LARGE} colorscheme={GREEN}>
              Your Score: {score}
            </Badge>
            <Text>
              {"You are "}
              <Badge colorscheme={GREEN}>{player}</Badge>
            </Text>
          </HStack>
          <Text>{timer}</Text>
          <Heading mt={20}>Realtime Leaderboard</Heading>

          <VStack w={FILL_PARENT}>
            <Card w={FILL_PARENT}>
              <CardBody>
                <VStack w={FILL_PARENT}>
                  <HStack colorscheme={GREEN}>
                    <Badge colorscheme={GREEN}>{Object.keys(room)[2]}</Badge>
                    <Text>{score}</Text>
                  </HStack>

                  <HStack>
                    <Badge colorscheme={GREEN}>{Object.keys(room)[1]}</Badge>
                    <Text>{player2.id?p2Score:"Wating..."}</Text>
                  </HStack>
                 
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          <VStack w={FILL_PARENT} position={ABSOLUTE} bottom={10} mt={100}>
            <Flex
              w={FILL_PARENT}
              justifyContent={START}
              direction={COLUMN}
              gap={2}
            >
              {chats?.map((el) => (
                <ChatBar chat={el} />
              ))}
            </Flex>
            <HStack>
              <Input
                onKeyDown={handleKeyDown}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Let's chat"
              ></Input>
              <Button
                onClick={() => {
                  socketRef.current.emit("send_message", { value });
                  if (value !== "") {
                    setChats((prev) => [...prev, value]);
                  }
                  setValue("");
                }}
              >
                Send
              </Button>

              <Button
                display={
                  room
                    ? maker.id == localStorage.getItem("userId")
                      ? "block"
                      : "none"
                    : "none"
                }
                onClick={() => {
                  localStorage.setItem("start",1)
                  socketRef.current.emit("start", {
                    rid: sessionStorage.getItem("rid"),
                  });
                  window.location.reload()
                }}
              >
                sm
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
}
