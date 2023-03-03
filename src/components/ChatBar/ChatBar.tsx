import { Card, CardBody, Flex, Image, Wrap } from "@chakra-ui/react";
import { FILL_PARENT } from "../../constants/constants";

interface bar{
    chat:string
}

export default function ChatBar({chat}:bar){

    return <Card w={FILL_PARENT}>

        <CardBody>
            <Flex w={FILL_PARENT}gap={2}>
                <Image w={"20px"} border={"1px solid black"} borderRadius={100} src="https://i.pravatar.cc/300"></Image>
                <Wrap padding={2}>{chat}</Wrap>
            </Flex>

        </CardBody>

    </Card>
}