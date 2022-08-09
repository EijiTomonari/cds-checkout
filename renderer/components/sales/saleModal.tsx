import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { Sale } from "../../lib/databaseServices";

const SaleModal = ({
  isOpen,
  onClose,
  sale,
}: {
  isOpen: boolean;
  onClose: () => void;
  sale?: Sale;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes da Venda</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading>{sale?.date.toDate().toLocaleString()}</Heading>
          <Table mt={10}>
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th>Valor</Th>
                <Th>Peso</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sale?.items.map((item) => (
                <Tr key={item.name}>
                  <Td>{item.name}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.weight}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Text mt={5} fontWeight={"bold"}>
            Valor total: R$ {sale?.value}
          </Text>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SaleModal;
