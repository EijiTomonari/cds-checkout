import { Divider, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SideMenu from "../components/sideMenu";
import { fetchStatisticsByDate, Statistics } from "../lib/databaseServices";
import { FaWallet, FaMoneyCheckAlt } from "react-icons/fa";
import {
  BsCreditCard2FrontFill,
  BsFillCreditCardFill,
  BsCashCoin,
} from "react-icons/bs";
import StatisticsBox from "../components/home/statisticsBox";
import SalesChart from "../components/home/salesChart";

const Home = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    value: 0,
    weight: 0,
    credit: 0,
    debit: 0,
    cash: 0,
  });
  useEffect(() => {
    fetchStatisticsByDate(new Date()).then((data) => {
      setStatistics(data as Statistics);
    });
  }, []);
  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"row"}>
      <SideMenu></SideMenu>
      <Flex w={"90vw"} h={"100vh"} p={5} flexDir="column">
        <Flex flexDir={"row"}>
          <StatisticsBox
            icon={FaWallet}
            title={"Vendas do dia"}
            subtitle={statistics.weight.toString().replace(".", ",") + " kg"}
            value={"R$ " + statistics.value.toString()}
          ></StatisticsBox>
          <StatisticsBox
            icon={FaMoneyCheckAlt}
            title={"Número de vendas"}
            subtitle={"vendas"}
            value={(
              statistics.cash +
              statistics.credit +
              statistics.debit
            ).toString()}
          ></StatisticsBox>
          <StatisticsBox
            icon={BsCreditCard2FrontFill}
            title={"Crédito"}
            subtitle={"vendas"}
            value={
              statistics.credit.toString() +
              " (" +
              Math.round(
                (statistics.credit /
                  (statistics.credit + statistics.debit + statistics.cash)) *
                  100
              ).toString() +
              "%)"
            }
          ></StatisticsBox>
          <StatisticsBox
            icon={BsFillCreditCardFill}
            title={"Débito"}
            subtitle={"vendas"}
            value={
              statistics.debit.toString() +
              " (" +
              Math.round(
                (statistics.debit /
                  (statistics.credit + statistics.debit + statistics.cash)) *
                  100
              ).toString() +
              "%)"
            }
          ></StatisticsBox>
          <StatisticsBox
            icon={BsCashCoin}
            title={"Dinheiro"}
            subtitle={"vendas"}
            value={
              statistics.cash.toString() +
              " (" +
              Math.round(
                (statistics.cash /
                  (statistics.credit + statistics.debit + statistics.cash)) *
                  100
              ).toString() +
              "%)"
            }
          ></StatisticsBox>
        </Flex>
        <Divider mt={10}></Divider>
        <SalesChart></SalesChart>
      </Flex>
    </Flex>
  );
};

export default Home;
