import { Tr, Td, Button, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { updateProduct } from "../../lib/databaseServices";
import { TicketItem } from "../../modules/tickets";

const ProductsListItem = ({
  item,
  setAllProductsList,
}: {
  item: TicketItem;
  setAllProductsList: Dispatch<SetStateAction<TicketItem[]>>;
}) => {
  const [isEditing, setisEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  useEffect(() => {
    setName(item.name);
    setPrice(item.price);
  }, [item]);

  const handleEdit = () => {
    if (name != "" && price != 0 && !isNaN(price)) {
      updateProduct(item.code, name, price).then(() => {
        setAllProductsList((prev) => {
          const newList = [...prev];
          const index = newList.findIndex((i) => i.code === item.code);
          newList[index] = { ...item, name, price };
          return newList;
        });
        setisEditing(false);
      });
    }
  };

  const cancel = () => {
    setisEditing(false);
    setName(item.name);
    setPrice(item.price);
  };

  return (
    <Tr
      key={item.code}
      backgroundColor={item.cantDelete ? "gray.100" : "white"}
    >
      {!isEditing && (
        <>
          <Td>{item.name}</Td>
          <Td>{"R$ " + price}</Td>
          <Td>{item.code}</Td>
          <Td>
            <Button onClick={() => setisEditing(true)}>Editar</Button>
          </Td>
        </>
      )}
      {isEditing && (
        <>
          <Td>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </Td>
          <Td>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            ></Input>
          </Td>
          <Td>{item.code}</Td>
          <Td>
            <Button colorScheme={"red"} onClick={cancel}>
              Cancelar
            </Button>
            <Button colorScheme="whatsapp" ml={2} onClick={handleEdit}>
              Salvar
            </Button>
          </Td>
        </>
      )}
    </Tr>
  );
};

export default ProductsListItem;
