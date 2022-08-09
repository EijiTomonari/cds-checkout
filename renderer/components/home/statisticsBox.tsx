import { Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

const StatisticsBox = ({
  icon,
  title,
  subtitle,
  value,
}: {
  icon: IconType;
  title: string;
  subtitle: string;
  value: string;
}) => {
  return (
    <Flex flexDir={"column"} borderRadius={20} boxShadow="md" p={5} ml={5}>
      <Flex flexDir={"row"} alignItems={"center"}>
        <Icon as={icon} w={4} height={4} color={"gray.600"}></Icon>
        <Text ml={2} fontWeight={"bold"} color={"gray.600"}>
          {title}
        </Text>
      </Flex>
      <Text fontSize={"3xl"} fontWeight={"bold"}>
        {value}
      </Text>
      <Text fontSize={"md"} my={-1} fontWeight={"light"}>
        {subtitle}
      </Text>
    </Flex>
  );
};

export default StatisticsBox;
