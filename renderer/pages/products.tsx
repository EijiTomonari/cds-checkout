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
import { useState, useEffect, ChangeEvent, useRef } from "react";
import ProductsListItem from "../components/products/productsListItem";
import SideMenu from "../components/sideMenu";
import { fetchProductsList } from "../lib/databaseServices";
import { TicketItem } from "../modules/tickets";

const Products = () => {
  const [producsList, setProductsList] = useState<TicketItem[]>();
  const [allProductsList, setAllProductsList] = useState<TicketItem[]>();
  const searchBarRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    fetchProductsList().then((data) => {
      setProductsList(data as TicketItem[]);
      setAllProductsList(data as TicketItem[]);
    });
    searchBarRef.current?.focus();
  }, []);
  useEffect(() => {
    setProductsList(allProductsList);
  }, [allProductsList]);
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 0) {
      setProductsList(
        allProductsList.filter(
          (item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.code.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setProductsList(allProductsList);
    }
  };
  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"row"}>
      <SideMenu></SideMenu>
      <Flex w={"90vw"} h={"100vh"} p={5} flexDir="column" overflowY={"auto"}>
        <Heading>Lista de Produtos</Heading>
        <Input
          ref={searchBarRef}
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
              producsList.map((item) => (
                <ProductsListItem
                  item={item}
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
