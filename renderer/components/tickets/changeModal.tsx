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

const ChangeModal = ({
  isOpen,
  onClose,
  setAmountPayed,
}: {
  isOpen: boolean;
  onClose: () => void;
  setAmountPayed: (update?: SetStateAction<number>) => void;
}) => {
  const [amount, setamount] = useState(0);
  const initialRef = useRef(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAmountPayed(amount);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Calcular troco</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id="change-form">
            <Text>Valor pago:</Text>
            <InputGroup>
              <InputLeftAddon children="R$" />
              <Input
                ref={initialRef}
                required
                type="number"
                value={amount}
                onChange={(e) => setamount(parseFloat(e.target.value))}
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

export default ChangeModal;
