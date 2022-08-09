import {
  Flex,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineDropbox } from "react-icons/ai";
import { FaMoneyBillWave, FaCashRegister } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const SideMenu = () => {
  return (
    <Flex
      w={"10vw"}
      h={"100vh"}
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
        <Link href="/tickets">
          <ListItem py={2}>
            <ListIcon as={FaCashRegister} color="white" />
            Comandas
          </ListItem>
        </Link>
      </List>
      <Spacer></Spacer>
      <List color={"white"} mt={10}>
        <Link href="/settings">
          <ListItem py={2}>
            <ListIcon as={FiSettings} color="white" />
            Configurações
          </ListItem>
        </Link>
      </List>
    </Flex>
  );
};

export default SideMenu;
