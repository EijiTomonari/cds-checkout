import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FormEvent, useEffect, useState } from "react";
import { addNewProduct } from "../../lib/databaseServices";
import { scanForUnknownProduct } from "../../modules/tickets";
import { itemsAtom } from "../../pages/tickets";

const NewProductModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [items, setitems] = useAtom(itemsAtom);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [index, setindex] = useState(-1);
  useEffect(() => {
    const index = scanForUnknownProduct(items);
    if (index !== -1) {
      setCode(items[index].code);
      setindex(index);
    }
  }, [items]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addNewProduct(code, name, price)
      .then(() => {
        setitems((previousState) => [
          ...previousState.slice(0, index),
          { code, name, price },
          ...previousState.slice(index + 1),
        ]);
      })
      .then(() => {
        setName("");
        setPrice(0);
      })
      .then(() => {
        onClose();
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar novo produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id="new-product-form">
            <Input isDisabled type="text" value={code} />
            <Input
              required
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
            />
            <Input
              required
              type="number"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" type="submit" form="new-product-form">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default NewProductModal;
