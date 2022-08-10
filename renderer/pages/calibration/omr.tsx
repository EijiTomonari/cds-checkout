import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SettingSlider from "../../components/settings/settingSlider";
import SideMenu from "../../components/sideMenu";
import { Settings } from "../../modules/settings";

const CalibrateBoxesArea = () => {
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
          <Img src={"http://127.0.0.1:5000/calibration/omr/feed"}></Img>
        </Flex>
        <Flex ml={4} flexDir={"column"} overflowY={"auto"} overflowX={"clip"}>
          <Heading>Calibre o reconhecimento das marcações</Heading>
          {settings && (
            <>
              <Heading mt={5} size={"md"}>
                Brilho e Contraste
              </Heading>
              <SettingSlider
                name={"OMR_CONTRAST"}
                defaultValue={settings["OMR_CONTRAST"].value}
                min={0}
                max={3}
                step={0.1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BRIGHTNESS"}
                defaultValue={settings["OMR_BRIGHTNESS"].value}
                min={0}
                max={100}
                step={1}
              ></SettingSlider>
              <Heading mt={5} size={"md"}>
                Limites
              </Heading>
              <SettingSlider
                name={"OMR_MAX_THRESHOLD"}
                defaultValue={settings["OMR_MAX_THRESHOLD"].value}
                min={0}
                max={255}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_THRESHOLD_BLOCK_SIZE"}
                defaultValue={settings["OMR_THRESHOLD_BLOCK_SIZE"].value}
                min={1}
                max={255}
                step={2}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_THRESHOLD_C"}
                defaultValue={settings["OMR_THRESHOLD_C"].value}
                min={-100}
                max={100}
                step={1}
              ></SettingSlider>
              <Heading mt={5} size={"md"}>
                Tolerâncias
              </Heading>
              <SettingSlider
                name={"OMR_BOX_MIN_ASPECT_RATIO"}
                defaultValue={settings["OMR_BOX_MIN_ASPECT_RATIO"].value}
                min={0.1}
                max={1}
                step={0.1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOX_MAX_ASPECT_RATIO"}
                defaultValue={settings["OMR_BOX_MAX_ASPECT_RATIO"].value}
                min={1}
                max={10}
                step={0.1}
              ></SettingSlider>

              <SettingSlider
                name={"OMR_STANDARD_DEVIATION_THRESHOLD"}
                defaultValue={
                  settings["OMR_STANDARD_DEVIATION_THRESHOLD"].value
                }
                min={1}
                max={4}
                step={0.1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOX_MIN_HEIGHT"}
                defaultValue={settings["OMR_BOX_MIN_HEIGHT"].value}
                min={1}
                max={100}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOX_MIN_WIDTH"}
                defaultValue={settings["OMR_BOX_MIN_WIDTH"].value}
                min={1}
                max={100}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOX_MAX_HEIGHT"}
                defaultValue={settings["OMR_BOX_MAX_HEIGHT"].value}
                min={1}
                max={100}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOX_MAX_WIDTH"}
                defaultValue={settings["OMR_BOX_MAX_WIDTH"].value}
                min={1}
                max={100}
                step={1}
              ></SettingSlider>
            </>
          )}
          <Flex flexDirection={"row"} w={"100%"} justifyContent="space-evenly">
            <Button
              colorScheme="blue"
              w={"49%"}
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push("/calibration/boxesArea")}
            >
              Voltar
            </Button>
            <Button
              w={"49%"}
              colorScheme="blue"
              rightIcon={<ArrowForwardIcon />}
              onClick={() => router.push("/settings")}
            >
              Avançar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CalibrateBoxesArea;
