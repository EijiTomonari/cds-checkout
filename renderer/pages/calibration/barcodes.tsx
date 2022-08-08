import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SettingSlider from "../../components/settings/settingSlider";
import SideMenu from "../../components/sideMenu";

const CalibrateBarcodes = () => {
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
      <Flex w={"100%"} p={5} overflowY={"auto"} flexDir={"row"}>
        <Flex w={"48%"} alignContent="center" justifyContent={"center"}>
          <Img src={"http://127.0.0.1:5000/calibration/barcodes/feed"}></Img>
        </Flex>
        <Flex ml={4} flexDir={"column"} overflowY={"auto"} overflowX={"clip"}>
          <Heading>Calibre o reconhecimento dos códigos de barras</Heading>
          {settings && (
            <>
              <Heading mt={5} size={"md"}>
                Tamanho
              </Heading>
              <SettingSlider
                name={"BARCODES_CAMERA_WIDTH"}
                defaultValue={settings["BARCODES_CAMERA_WIDTH"].value}
                min={10}
                max={1080}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"BARCODES_CAMERA_HEIGHT"}
                defaultValue={settings["BARCODES_CAMERA_HEIGHT"].value}
                min={10}
                max={1920}
                step={1}
              ></SettingSlider>
              <Heading mt={5} size={"md"}>
                Área de Corte
              </Heading>
              <SettingSlider
                name={"BARCODES_AREA_X1"}
                defaultValue={settings["BARCODES_AREA_X1"].value}
                min={10}
                max={1920}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"BARCODES_AREA_X2"}
                defaultValue={settings["BARCODES_AREA_X2"].value}
                min={10}
                max={1920}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"BARCODES_AREA_Y1"}
                defaultValue={settings["BARCODES_AREA_Y1"].value}
                min={10}
                max={1080}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"BARCODES_AREA_Y2"}
                defaultValue={settings["BARCODES_AREA_Y2"].value}
                min={10}
                max={1080}
                step={1}
              ></SettingSlider>
              <Heading mt={5} size={"md"}>
                Brilho e Contraste
              </Heading>
              <SettingSlider
                name={"BARCODES_CONTRAST"}
                defaultValue={settings["BARCODES_CONTRAST"].value}
                min={0}
                max={3}
                step={0.1}
              ></SettingSlider>
              <SettingSlider
                name={"BARCODES_BRIGHTNESS"}
                defaultValue={settings["BARCODES_BRIGHTNESS"].value}
                min={0}
                max={100}
                step={1}
              ></SettingSlider>
            </>
          )}
          <Button
            colorScheme="blue"
            minH={"40px"}
            rightIcon={<ArrowForwardIcon />}
            onClick={() => router.push("/settings")}
          >
            Avançar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CalibrateBarcodes;
