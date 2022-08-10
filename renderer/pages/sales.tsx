import {
  Flex,
  Heading,
  Input,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SaleModal from "../components/sales/saleModal";
import SideMenu from "../components/sideMenu";
import { fetchSalesByDate, Sale } from "../lib/databaseServices";

const Sales = () => {
  const [date, setdate] = useState<Date>(new Date());
  const [sales, setsales] = useState<Sale[]>();
  const [saleDetail, setSaleDetail] = useState<Sale>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    fetchSalesByDate(date).then((data) => {
      setsales(data as Sale[]);
    });
  }, [date]);

  const handleOpenModal = (sale: Sale) => {
    setSaleDetail(sale);
    onOpen();
  };

  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"row"}>
      <SideMenu></SideMenu>
      <Flex w={"90vw"} h={"100vh"} p={5} flexDir={"column"}>
        <SaleModal
          isOpen={isOpen}
          onClose={onClose}
          sale={saleDetail}
        ></SaleModal>
        <Heading>Vendas</Heading>
        <Input
          mt={5}
          type="datetime-local"
          onChange={(e) => {
            setdate(new Date(e.target.value));
          }}
          w={"30%"}
        ></Input>
        <Table>
          <Thead>
            <Tr>
              <Th>Data e Horário</Th>
              <Th>Itens</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales &&
              sales.map((sale) => (
                <Tr
                  key={sale.date.toDate().toLocaleDateString()}
                  onClick={(e) => handleOpenModal(sale)}
                >
                  <Th>
                    <Link>{sale.date.toDate().toLocaleString()}</Link>
                  </Th>
                  <Th>{sale.items.length}</Th>
                  <Th>{sale.value}</Th>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default Sales;
