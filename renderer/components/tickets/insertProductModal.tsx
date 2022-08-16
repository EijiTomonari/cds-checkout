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
  InputRightAddon,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { TicketItem } from "../../modules/tickets";

const InsertProductModal = ({
  isOpen,
  onClose,
  setProductCode,
  insertProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  setProductCode: (update?: SetStateAction<string>) => void;
  insertProduct: () => void;
}) => {
  const initialRef = useRef(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    insertProduct();
    onClose();
  };
  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.select();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Inserir produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id="change-form">
            <Text>Código do produto:</Text>
            <InputGroup>
              <InputLeftAddon children="Cdg." />
              <Input
                ref={initialRef}
                required
                type="text"
                onFocus={handleFocus}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </InputGroup>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" type="submit" form="change-form">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InsertProductModal;
