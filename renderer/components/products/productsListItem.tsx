import { Tr, Td, Button, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { updateProduct } from "../../lib/databaseServices";
import { TicketItem } from "../../modules/tickets";

const ProductsListItem = ({
  items,
  index,
  setAllProductsList,
}: {
  items: TicketItem[];
  index: number;
  setAllProductsList: Dispatch<SetStateAction<TicketItem[]>>;
}) => {
  const [isEditing, setisEditing] = useState(false);
  const [name, setName] = useState(items[index].name);
  const [price, setPrice] = useState(items[index].price);

  const handleEdit = () => {
    if (name != "" && price != 0 && !isNaN(price)) {
      updateProduct(items[index].code, name, price).then(() => {
        setAllProductsList(
          items.map((item, i) => {
            if (i === index) {
              return { ...item, name, price };
            } else {
              return item;
            }
          })
        );
        setisEditing(false);
      });
    }
  };

  const cancel = () => {
    setisEditing(false);
    setName(items[index].name);
    setPrice(items[index].price);
  };
  return (
    <Tr
      key={items[index].code}
      backgroundColor={items[index].cantDelete ? "gray.100" : "white"}
    >
      {!isEditing && (
        <>
          <Td>{items[index].name}</Td>
          <Td>{"R$ " + items[index].price}</Td>
          <Td>{items[index].code}</Td>
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
          <Td>{items[index].code}</Td>
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
