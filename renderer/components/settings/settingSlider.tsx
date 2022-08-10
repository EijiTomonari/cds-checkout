import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

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
  const debouncedValue = useDebounce(value, 100);
  useEffect(() => {
    if (value) {
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("value", value.toString());
      fetch("http://127.0.0.1:5000/settings/write", {
        method: "POST",
        body: formData,
      }).catch((e) => console.log(e));
    }
  }, [debouncedValue]);
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
