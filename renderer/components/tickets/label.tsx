import { Flex, Icon, Heading } from "@chakra-ui/react";
import { IconType } from "react-icons";

const Label = ({
  text,
  color,
  icon,
  mx,
  headingSize,
}: {
  text: string;
  color: string;
  icon: IconType;
  mx?: number;
  headingSize?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  return (
    <Flex
      my={2}
      mx={mx}
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      background={color}
      color={"white"}
      borderRadius={5}
      h={38}
      textAlign={"center"}
      px={1}
    >
      <Icon as={icon}></Icon>
      <Heading ml={1} size={headingSize ?? "sm"}>
        {text}
      </Heading>
    </Flex>
  );
};

export default Label;
