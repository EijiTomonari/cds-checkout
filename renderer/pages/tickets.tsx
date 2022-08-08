import {
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { FaPercent, FaFileInvoice, FaMoneyBillWave } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { HiCreditCard } from "react-icons/hi";
import SideMenu from "../components/sideMenu";
import Label from "../components/tickets/label";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  fetchProductsList,
  fetchTicketModel,
  storeSale,
} from "../lib/databaseServices";
import { DocumentData } from "@firebase/firestore";
import {
  processBarCodesData,
  processOMRData,
  scanForUnknownProduct,
  TicketItem,
} from "../modules/tickets";
import { ImCross } from "react-icons/im";
import Hotkeys from "react-hot-keys";
import useSound from "use-sound";
import { atom, useAtom } from "jotai";
import NewProductModal from "../components/tickets/newProductModal";
import DiscountModal from "../components/tickets/discountModal";
import ChangeModal from "../components/tickets/changeModal";
import NotaFiscalModal from "../components/tickets/notaFiscalModal";
export const itemsAtom = atom<TicketItem[]>([]);
const Tickets: NextPage = () => {
  const [productsList, setProductsList] = useState<DocumentData[]>();
  const [omrProductsList, setOmrProductsList] = useState<DocumentData[]>();
  const [ticketModel, setTicketModel] = useState<DocumentData>();
  const [items, setitems] = useAtom(itemsAtom);
  const [total, settotal] = useState(0);
  const [amountPayed, setamountPayed] = useState(0);
  const [play] = useSound("sounds/beep.wav");
  const bottomRef = useRef(null);
  const {
    isOpen: isNewProductModalOpen,
    onOpen: onOpenNewProductModal,
    onClose: onCloseNewProductModal,
  } = useDisclosure();
  const {
    isOpen: isDiscountModalOpen,
    onOpen: onOpenDiscountModal,
    onClose: onCloseDiscountModal,
  } = useDisclosure();
  const {
    isOpen: isChangeModalOpen,
    onOpen: onOpenChangeModal,
    onClose: onCloseChangeModal,
  } = useDisclosure();
  const {
    isOpen: isNotaFiscalModalOpen,
    onOpen: onOpenNotaFiscalModal,
    onClose: onCloseNotaFiscalModal,
  } = useDisclosure();
  useEffect(() => {
    fetchProductsList().then((data) => {
      const omrProductsList = data.filter((item) => item.cantDelete === true);
      setProductsList(data);
      setOmrProductsList(omrProductsList);
    });
    fetchTicketModel().then((data) => {
      setTicketModel(data);
    });
  }, [isNewProductModalOpen]);
  const fetchScans = async () => {
    const barcodesRes = await fetch("http://127.0.0.1:5000/barcodes/scan");
    const barcodesData = await barcodesRes.json();
    if (barcodesData.barcodes) {
      const processedItems = processBarCodesData(
        barcodesData.barcodes,
        productsList
      );
      if (processedItems) {
        setitems((previousState) => [...previousState, ...processedItems]);
        play();
      }
    }
    const omrRes = await fetch("http://127.0.0.1:5000/omr/scan");
    const omrData = await omrRes.json();
    if (omrRes.status === 200 || omrRes.status === 201) {
      const processedItems = processOMRData(
        omrData.message,
        omrProductsList,
        ticketModel
      );
      if (processedItems) {
        setitems((previousState) => [...previousState, ...processedItems]);
        play();
      }
    } else {
      console.error(omrData);
    }
  };
  const {
    status: omrStatus,
    data: omrData,
    error: omrError,
    isFetching: omrIsFetching,
  } = useQuery(["omrQuery"], fetchScans, {
    refetchInterval: 1000,
  });
  const removeItem = (index: number) => {
    setitems((previousState) => {
      const newState = [...previousState];
      newState.splice(index, 1);
      return newState;
    });
  };
  const removeAllItems = () => {
    setitems([]);
  };
  const calculateTotal = () => {
    return (
      Math.round(items.reduce((acc, item) => acc + item.price, 0) * 100) / 100
    );
  };
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const finishSale = (method: string) => {
    storeSale(method, total, items).then(() => {
      removeAllItems();
      setamountPayed(0);
    });
  };

  useEffect(() => {
    settotal(calculateTotal());
    const unknownIndex = scanForUnknownProduct(items);
    if (unknownIndex > -1) {
      onOpenNewProductModal();
    }
    scrollToBottom();
  }, [items]);
  return (
    <Hotkeys keyName="f9" onKeyDown={removeAllItems}>
      <Hotkeys keyName="f2" onKeyDown={onOpenDiscountModal}>
        <Hotkeys keyName="f3" onKeyDown={onOpenChangeModal}>
          <Hotkeys keyName="f4" onKeyDown={onOpenNotaFiscalModal}>
            <Hotkeys keyName="f5" onKeyDown={() => finishSale("debit")}>
              <Hotkeys keyName="f6" onKeyDown={() => finishSale("credit")}>
                <Hotkeys keyName="f7" onKeyDown={() => finishSale("money")}>
                  <Flex w={"100vw"} h={"100vh"} flexDir={"row"}>
                    <NewProductModal
                      isOpen={isNewProductModalOpen}
                      onClose={onCloseNewProductModal}
                    ></NewProductModal>
                    <DiscountModal
                      isOpen={isDiscountModalOpen}
                      onClose={onCloseDiscountModal}
                      total={total}
                      setItems={setitems}
                    ></DiscountModal>
                    <ChangeModal
                      isOpen={isChangeModalOpen}
                      onClose={onCloseChangeModal}
                      setAmountPayed={setamountPayed}
                    ></ChangeModal>
                    <NotaFiscalModal
                      isOpen={isNotaFiscalModalOpen}
                      onClose={onCloseNotaFiscalModal}
                    ></NotaFiscalModal>
                    <SideMenu></SideMenu>
                    <Flex w={"90vw"} h={"100vh"}>
                      <Flex flexDir={"column"} w={"75%"} overflowY={"auto"}>
                        <Table fontSize={"lg"} w={"100%"}>
                          <Thead>
                            <Tr>
                              <Th>Nome</Th>
                              <Th>Valor</Th>
                              <Th></Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {items &&
                              items.map((item, index) => (
                                <Tr key={index}>
                                  <Td>{item.name}</Td>
                                  <Td>{item.price}</Td>
                                  <Td>
                                    <Button
                                      colorScheme="red"
                                      size={"sm"}
                                      onClick={(e) => {
                                        removeItem(index);
                                      }}
                                    >
                                      <Icon as={ImCross}></Icon>
                                    </Button>
                                  </Td>
                                </Tr>
                              ))}
                            <Tr ref={bottomRef}></Tr>
                          </Tbody>
                        </Table>
                      </Flex>
                      <Flex flexDir={"column"} h={"100vh"}>
                        <Flex w={"100%"} flexDir={"column"} p="5">
                          <Heading size="md">Ações</Heading>
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
                        <Flex
                          flexDir={"row"}
                          p="5"
                          justifyContent="space-evenly"
                        >
                          <Stack>
                            <Heading size="md">Total</Heading>
                            <Heading alignSelf="flex-start" mt={2}>
                              R$ {total}
                            </Heading>
                            {amountPayed > 0 && (
                              <>
                                <Heading size="md">Valor pago</Heading>
                                <Heading alignSelf="flex-start" mt={2}>
                                  R$ {amountPayed}
                                </Heading>
                              </>
                            )}
                            {amountPayed > 0 && (
                              <>
                                <Heading size="md" color="red">
                                  Troco
                                </Heading>
                                <Heading
                                  alignSelf="flex-start"
                                  mt={2}
                                  color="red"
                                >
                                  R${" "}
                                  {Math.round((amountPayed - total) * 100) /
                                    100}
                                </Heading>
                              </>
                            )}
                          </Stack>
                        </Flex>
                        <Spacer></Spacer>
                        <Flex flexDir={"column"} p={5}>
                          <Heading size="md">Finalizar venda</Heading>
                          <Flex
                            flexDir={"row"}
                            justifyContent="space-around"
                            mt={5}
                          >
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
                </Hotkeys>
              </Hotkeys>
            </Hotkeys>
          </Hotkeys>
        </Hotkeys>
      </Hotkeys>
    </Hotkeys>
  );
};

export default Tickets;
