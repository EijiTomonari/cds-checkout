import { Flex } from "@chakra-ui/react";
import SideMenu from "../components/sideMenu";

const Products = () => {
  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"row"}>
      <SideMenu></SideMenu>
      <Flex w={"90vw"} h={"100vh"}></Flex>
    </Flex>
  );
};

export default Products;
