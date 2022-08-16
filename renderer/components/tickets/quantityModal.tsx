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

const QuantityModal = ({
  isOpen,
  onClose,
  setQuantity,
}: {
  isOpen: boolean;
  onClose: () => void;
  setQuantity: (update?: SetStateAction<number>) => void;
}) => {
  const [amount, setamount] = useState(1);
  const initialRef = useRef(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuantity(amount);
    onClose();
  };
  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.select();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Inserir quantidade</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id="change-form">
            <Text>Quantidade:</Text>
            <InputGroup>
              <InputLeftAddon children="Qtd." />
              <Input
                ref={initialRef}
                required
                type="number"
                onFocus={handleFocus}
                value={amount}
                onChange={(e) => setamount(parseInt(e.target.value))}
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

export default QuantityModal;
