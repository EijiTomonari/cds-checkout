import {
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import ProductsListItem from "../components/products/productsListItem";
import SideMenu from "../components/sideMenu";
import { fetchProductsList } from "../lib/databaseServices";
import { TicketItem } from "../modules/tickets";

const Products = () => {
  const [producsList, setProducsList] = useState<TicketItem[]>();
  const [allProductsList, setAllProductsList] = useState<TicketItem[]>();
  useEffect(() => {
    fetchProductsList().then((data) => {
      setProducsList(data as TicketItem[]);
      setAllProductsList(data as TicketItem[]);
    });
  }, []);
  useEffect(() => {
    setProducsList(allProductsList);
  }, [allProductsList]);
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 0) {
      setProducsList(
        allProductsList.filter(
          (item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.code.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setProducsList(allProductsList);
    }
  };
  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"row"}>
      <SideMenu></SideMenu>
      <Flex w={"90vw"} h={"100vh"} p={5} flexDir="column" overflowY={"auto"}>
        <Heading>Lista de Produtos</Heading>
        <Input
          p={5}
          placeholder="Procurar item"
          size={"lg"}
          my={2}
          onChange={search}
        ></Input>
        <Table>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>Código</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {producsList &&
              producsList.map((item, index) => (
                <ProductsListItem
                  items={allProductsList}
                  index={index}
                  setAllProductsList={setAllProductsList}
                ></ProductsListItem>
              ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default Products;
