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

const DiscountModal = ({
  isOpen,
  onClose,
  total,
  setItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  setItems: (update?: SetStateAction<TicketItem[]>) => void;
}) => {
  const [percentage, setpercentage] = useState(0);
  const [amount, setamount] = useState(0);
  const initialRef = useRef(null);
  const handlePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(total * parseFloat(e.target.value)) / 100;
    setamount(value);
    setpercentage(parseFloat(e.target.value));
  };
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setamount(value);
    setpercentage(Math.round((value / total) * 100) / 100);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setItems((previousState) => [
      ...previousState,
      { name: "Desconto", price: -amount },
    ]);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar desconto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id="new-product-form">
            <Text>Porcentagem:</Text>
            <InputGroup>
              <Input
                ref={initialRef}
                required
                type="number"
                value={percentage}
                onChange={handlePercentageChange}
              />
              <InputRightAddon children="%" />
            </InputGroup>
            <Text>Valor:</Text>
            <InputGroup>
              <InputLeftAddon children="R$" />
              <Input
                required
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </InputGroup>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" type="submit" form="new-product-form">
            Inserir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DiscountModal;
