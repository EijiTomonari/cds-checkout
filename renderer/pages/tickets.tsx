import {
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { FaPercent, FaFileInvoice, FaMoneyBillWave } from "react-icons/fa";
import { BiScan, BiBarcodeReader } from "react-icons/bi";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { HiCreditCard } from "react-icons/hi";
import SideMenu from "../components/sideMenu";
import Label from "../components/tickets/label";

const Tickets: NextPage = () => {
  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"row"}>
      <SideMenu></SideMenu>
      <Flex w={"90vw"} h={"100vh"}>
        <Table fontSize={"lg"} w={"75%"}>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Valor</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
        <Flex flexDir={"column"} h={"100vh"}>
          <Flex w={"100%"} flexDir={"column"} p="5">
            <Heading size="md">Ações</Heading>
            <Label
              text={"Escanear comanda (Barra de espaço)"}
              color={"teal.500"}
              icon={BiScan}
            ></Label>
            <Label
              text={"Escanear código de barras (F1)"}
              color={"purple.500"}
              icon={BiBarcodeReader}
            ></Label>
            <Label
              text={"Inserir desconto (F2)"}
              color={"yellow.500"}
              icon={FaPercent}
            ></Label>
            <Label
              text={"Calcular troco (F3)"}
              color={"blue.500"}
              icon={GiReceiveMoney}
            ></Label>
            <Label
              text={" Emitir Cupom Fiscal (F4)"}
              color={"orange.500"}
              icon={FaFileInvoice}
            ></Label>
          </Flex>
          <Flex flexDir={"row"} p="5" justifyContent="space-evenly">
            <Stack>
              <Heading size="md">Total</Heading>
              <Heading alignSelf="flex-start" mt={2}>
                R$ 200
              </Heading>
            </Stack>
          </Flex>
          <Spacer></Spacer>
          <Flex flexDir={"column"} p={5}>
            <Heading size="md">Finalizar venda</Heading>
            <Flex flexDir={"row"} justifyContent="space-around" mt={5}>
              <Label
                mx={1}
                text={"Débito (F5)"}
                color={"facebook.500"}
                icon={BsFillCreditCard2FrontFill}
                headingSize="xs"
              ></Label>
              <Label
                mx={1}
                text={"Crédito (F6)"}
                color={"linkedin.500"}
                icon={HiCreditCard}
                headingSize="xs"
              ></Label>
              <Label
                mx={1}
                text={"Dinheiro (F7)"}
                color={"green.500"}
                icon={FaMoneyBillWave}
                headingSize="xs"
              ></Label>
            </Flex>

            <Label
              mx={1}
              text={"Cancelar venda (F9)"}
              color={"red.500"}
              icon={MdCancel}
              headingSize="xs"
            ></Label>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Tickets;
