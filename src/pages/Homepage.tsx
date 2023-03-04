import { Box, Button, Input, useDisclosure } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { Game } from "../scripts/Game";
import "./homepage.css";
import "../styles/button.css";
import { Link, useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { BLACK, GREEN, PINK, TRANSPARENT, WHITE, WHITESMOKE } from "../constants/constants";
import axios from "axios";
import { BASE_URL } from "../constants/config";

export default function Homepage({}) {
  const id = localStorage.getItem("userId");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [roomId,setRoomId]=useState("")
  const nav = useNavigate()


  const handleClick = () => {
    onOpen()
  };

  // useEffect(()=>{

  //     Game()
  // },[])
  return (
    <Box className="home">
      <img src="https://media.giphy.com/media/JmUd8L6SMdTrriXSEc/giphy.gif" />

      <div className="homeButtons">
        <p>Your Player ID: {id}</p>
        {/* <img src="https://media3.giphy.com/media/dJezVlwfVulTykjRQj/giphy.gif?cid=ecf05e47bo36cie802msre03aopsq2y9zjr0d9s3bvb8wri1&rid=giphy.gif&ct=g"></img> */}
        <div>
          <Link to="/room">
            <button className="button-85" onClick={() => handleClick()}>
              CREATE A ROOM
            </button>
          </Link>


          <>
          <button className="button-85" onClick={() => handleClick()}>
              JOIN A ROOM
            </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={BLACK} bg={PINK}>
          <ModalHeader>Enter Room ID</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={TRANSPARENT}>
            <Input border={"1px solid black"} color={BLACK} _placeholder={{color:BLACK}} placeholder="Enter room ID" value={roomId} onChange={(e)=>setRoomId(e.target.value)}></Input>





          </ModalBody>

          <ModalFooter>
            <Button colorScheme={WHITE} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={PINK}  onClick={async()=>{

              try {
                let res = await axios({
                  method:"patch",
                  data:{id:Number(localStorage.getItem("userId"))},
                  url:BASE_URL+"/join/"+roomId
                })

                let {status,message} = res.data

                if(status==1){
                  sessionStorage.setItem("rid",roomId)
                  onClose()
                  nav("/play")
                  
                }else if(status==2){
                  sessionStorage.setItem("rid",roomId)
                  onClose()   
                  nav("/play")             
                }else if(status==3){
                  alert("Room is full")
                }else if(status==4){
                  alert(message)
                }else{
                  alert("Something went wrong: "+message)
                }
                
              } catch (error) {

                alert(error)

                
              }



            }}>Join Room</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>


        </div>
      </div>
    </Box>
  );
}
