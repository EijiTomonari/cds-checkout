import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SettingSlider from "../../components/settings/settingSlider";
import SideMenu from "../../components/sideMenu";

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
        <Flex w={"50%"} alignContent="center" justifyContent={"center"}>
          <Img
            src={"http://127.0.0.1:5000/calibration/omr/boxesarea/feed"}
          ></Img>
        </Flex>
        <Flex ml={4} flexDir={"column"}>
          <Heading>Calibre o corte da área de marcação</Heading>
          {settings && (
            <>
              <SettingSlider
                name={"OMR_CAMERA_WIDTH"}
                defaultValue={settings["OMR_CAMERA_WIDTH"].value}
                min={10}
                max={1080}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_CAMERA_HEIGHT"}
                defaultValue={settings["OMR_CAMERA_HEIGHT"].value}
                min={10}
                max={1920}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOXES_AREA_X1"}
                defaultValue={settings["OMR_BOXES_AREA_X1"].value}
                min={10}
                max={1920}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOXES_AREA_X2"}
                defaultValue={settings["OMR_BOXES_AREA_X2"].value}
                min={10}
                max={1920}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOXES_AREA_Y1"}
                defaultValue={settings["OMR_BOXES_AREA_Y1"].value}
                min={10}
                max={1080}
                step={1}
              ></SettingSlider>
              <SettingSlider
                name={"OMR_BOXES_AREA_Y2"}
                defaultValue={settings["OMR_BOXES_AREA_Y2"].value}
                min={10}
                max={1080}
                step={1}
              ></SettingSlider>
            </>
          )}
          <Button
            colorScheme="blue"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => router.push("/calibration/omr")}
          >
            Avançar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CalibrateBoxesArea;
