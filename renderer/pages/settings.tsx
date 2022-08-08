import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideMenu from "../components/sideMenu";
import { Settings } from "../modules/settings";

const Settings = () => {
  const [settings, setSettings] = useState<Settings>();
  const router = useRouter();
  useEffect(() => {
    fetch("http://127.0.0.1:5000/settings/read")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);
  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"row"}>
      <SideMenu></SideMenu>
      <Flex w={"100%"} p={5} overflowY={"auto"} flexDir={"column"}>
        <Flex flexDirection={"row"} justifyContent={"space-evenly"}>
          <Button onClick={() => router.push("/calibration/boxesArea")}>
            Calibrar OMR
          </Button>
          <Button onClick={() => router.push("/calibration/barcodes")}>
            Calibrar código de barras
          </Button>
        </Flex>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th isNumeric>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {settings &&
              Object.keys(settings).map((key) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td isNumeric>{settings[key].value}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default Settings;
