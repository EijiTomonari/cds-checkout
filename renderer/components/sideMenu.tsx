import { Flex, Image, Link, List, ListIcon, ListItem } from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineDropbox } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";

const SideMenu = () => {
  return (
    <Flex
      w={"10vw"}
      flexDir={"column"}
      backgroundColor={"black"}
      alignItems={"center"}
      pt={10}
    >
      <Image src={"/images/logo.png"} w={"80%"}></Image>
      <List color={"white"} mt={10}>
        <Link href="/home">
          <ListItem py={2}>
            <ListIcon as={AiOutlineHome} color="white" />
            Home
          </ListItem>
        </Link>
        <Link href="/sales">
          <ListItem py={2}>
            <ListIcon as={FaMoneyBillWave} color="white" />
            Vendas
          </ListItem>
        </Link>
        <Link href="/products">
          <ListItem py={2}>
            <ListIcon as={AiOutlineDropbox} color="white" />
            Produtos
          </ListItem>
        </Link>
      </List>
    </Flex>
  );
};

export default SideMenu;
