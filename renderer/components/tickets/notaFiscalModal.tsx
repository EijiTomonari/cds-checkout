import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  Text,
  InputGroup,
  InputLeftAddon,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { ipcRenderer } from "electron";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { itemsAtom } from "../../pages/tickets";

const NotaFiscalModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [items, setitems] = useAtom(itemsAtom);
  const [amount, setamount] = useState(0);
  const initialRef = useRef(null);

  const sendMealsOnly = () => {
    const value =
      Math.round(
        items
          .filter((item) => item.name == "Refeição")
          .reduce((acc, item) => acc + item.price, 0) * 100
      ) / 100;
    ipcRenderer.send("emmit-nf", value);
    //fetch("api/nf/emmit?value=" + value).then(() => onClose());
  };

  const sendAll = () => {
    const value =
      Math.round(items.reduce((acc, item) => acc + item.price, 0) * 100) / 100;
    ipcRenderer.send("emmit-nf", value);
    //fetch("api/nf/emmit?value=" + value).then(() => onClose());
  };

  const sendAmount = () => {
    ipcRenderer.send("emmit-nf", amount);
    //fetch("api/nf/emmit?value=" + amount).then(() => onClose());
  };

  useEffect(() => {
    ipcRenderer.on("emmit-nf", (event, data) => {
      onClose();
    });
    return () => {
      ipcRenderer.removeAllListeners("emmit-nf");
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Emitir Nota Fiscal</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Text>
            {"Número de refeições na comanda: " +
              items.filter((item) => item.name == "Refeição").length}
          </Text>
          <Text>
            {"Valor das refeições na comanda: R$ " +
              Math.round(
                items
                  .filter((item) => item.name == "Refeição")
                  .reduce((acc, item) => acc + item.price, 0) * 100
              ) /
                100}
          </Text>
          <Flex flexDir={"row"} alignItems={"center"} mt={5}>
            <Button
              ref={initialRef}
              colorScheme="green"
              type="submit"
              form="change-form"
              mx={2}
              onClick={() => {
                sendMealsOnly();
              }}
            >
              Emitir só refeições
            </Button>
            <Button
              colorScheme="green"
              type="submit"
              form="change-form"
              mx={2}
              onClick={() => sendAll()}
            >
              Emitir tudo
            </Button>
            <Stack mx={2}>
              <Text>Inserir valor:</Text>
              <InputGroup>
                <InputLeftAddon children="R$" />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setamount(parseFloat(e.target.value))}
                />
              </InputGroup>
              <Button
                colorScheme="green"
                form="change-form"
                onClick={() => sendAmount()}
              >
                Emitir valor
              </Button>
            </Stack>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotaFiscalModal;
