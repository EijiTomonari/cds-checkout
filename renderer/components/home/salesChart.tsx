import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { fetchStatisticsByDate } from "../../lib/databaseServices";
import { CircularProgress, Flex } from "@chakra-ui/react";
import StatisticsBox from "./statisticsBox";
import { RiScales2Line } from "react-icons/ri";
import { GiCash } from "react-icons/gi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Últimos 30 dias",
    },
  },
};

const fetchChartData = async () => {
  let labels = [];
  let value = [];
  let weight = [];
  const today = new Date();
  today.setDate(today.getDate() - 29);
  for (let index = 0; index < 30; index++) {
    const statistics = await fetchStatisticsByDate(today);
    value.push(statistics.value);
    weight.push(statistics.weight);
    labels.push(today.toLocaleDateString().slice(0, -5));
    today.setDate(today.getDate() + 1);
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Receita",
        data: value,
        borderColor: "#3cd653",
        backgroundColor: "#066924",
        lineTension: 0.5,
      },
      {
        label: "Kg de alimento",
        data: weight,
        borderColor: "#3ca0d6",
        backgroundColor: "#064669",
        lineTension: 0.5,
      },
    ],
  };
  return data;
};

const SalesChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Últimos 14 dias",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const [totalValue, setTotalValue] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  useEffect(() => {
    fetchChartData()
      .then((data) => {
        setData(data);
        setTotalValue(data.datasets[0].data.reduce((a, b) => a + b));
        setTotalWeight(data.datasets[1].data.reduce((a, b) => a + b));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Flex flexDir={"row"}>
      <Flex w={"85%"} mt={5}>
        <Line options={options} data={data} />
      </Flex>
      <Flex flexDir={"column"} justifyContent={"space-evenly"}>
        <StatisticsBox
          icon={GiCash}
          title={"Receita"}
          subtitle={"Últimos 30 dias"}
          value={"R$ " + totalValue.toString()}
        ></StatisticsBox>
        <StatisticsBox
          icon={RiScales2Line}
          title={"Kg de Alimento"}
          subtitle={"Últimos 30 dias"}
          value={Math.round(totalWeight * 100) / 100 + " kg"}
        ></StatisticsBox>
      </Flex>
    </Flex>
  );
};

export default SalesChart;
