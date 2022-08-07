import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SettingSlider = ({
  name,
  defaultValue,
  min,
  max,
  step,
}: {
  name: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
}) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    if (value)
      fetch("/api/settings/set", {
        method: "POST",
        body: JSON.stringify({ name: name, value: value }),
      });
  }, [value]);
  return (
    <Slider
      min={min}
      max={max}
      step={step}
      aria-label="slider-ex-1"
      my={10}
      defaultValue={defaultValue}
      onChange={(v) => setValue(v)}
    >
      <SliderMark value={min}>{name}</SliderMark>
      <SliderMark
        value={value}
        textAlign="center"
        bg="blue.500"
        color="white"
        mt="-10"
        ml="-8%"
        w="12"
      >
        {value}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default SettingSlider;
