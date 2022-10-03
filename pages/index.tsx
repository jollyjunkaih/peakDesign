import {
  Container,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import type { NextPage } from "next";
import Head from "next/head";
import dollarIcon from "../static/dollarIcon.png";
import carbonIcon from "../static/carbonIcon.png";
import { Card, ChangeIcon, Menu } from "../components";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
const Home: NextPage = () => {
  const [wepData, setWepData] = useState([]);
  const date = "2022-10-05";
  const getData = () => {
    const url =
      "https://pp54rnj5cl.execute-api.ap-southeast-1.amazonaws.com/items";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    })
      .then((response) => response.json())
      .then(({ Items, Count, ScannedCount }) => {
        const rightDateArray = Items.filter((item: any) => {
          return item.date === date;
        });
        const arrangedTimeArray = rightDateArray.sort((a, b) => {
          const timeA = a.time.replace(":", "");
          const timeB = b.time.replace(":", "");
          return parseInt(timeA) - parseInt(timeB);
        });

        setWepData(arrangedTimeArray.slice(16, 39));
      });
  };
  useEffect(() => getData(), []);
  const labels = wepData.map((item) => {
    return item.time;
  });
  const data = {
    labels,
    legend: "bottom",
    datasets: [
      {
        type: "bar" as const,
        label: "WEP Price (in SGD)",

        borderWidth: 2,
        fill: false,
        data: wepData.map((item) => item.price),
      },
      {
        type: "line" as const,
        label: "Usual Consumption Pattern",
        backgroundColor: "red",
        borderColor: "red",
        data: [
          70, 100, 140, 201, 173, 160, 155, 110, 76, 80, 133, 160, 154, 155,
          190, 180, 209, 150, 140, 158, 120, 111, 100,
        ],
        borderWidth: 2,
      },
      {
        type: "line" as const,
        label: "Consumption with Recommended Behaviour Changes",
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 2,

        data: [
          70, 80, 90, 120, 100, 120, 160, 170, 220, 250, 230, 160, 130, 110, 90,
          95, 110, 120, 140, 100, 90, 80, 100,
        ],
      },
    ],
  };
  return (
    <div
      style={{
        backgroundColor: "#FFFFF0",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Head>
        <title>PEAK Dashboard</title>
        <meta
          name="description"
          content="Save eletrical costs of your company by using our recommender system"
        />

        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Menu selected="DASHBOARD"></Menu>
      <div style={{ paddingTop: 50, width: "100%" }}>
        <Card>
          <>
            <Text fontSize={"20px"}>Energy Cost Savings</Text>
            <Flex direction={"row"} marginTop={5}>
              <ChangeIcon
                img={dollarIcon.src}
                text="This Week"
                amount="$ 542.5"
                change={10.2}
              ></ChangeIcon>
              <ChangeIcon
                img={dollarIcon.src}
                text="Last Week"
                amount="$ 580.2"
                change={12.2}
              ></ChangeIcon>
              <ChangeIcon
                img={dollarIcon.src}
                text="This Month"
                amount="$ 1905.4"
                change={11.6}
              ></ChangeIcon>
            </Flex>
            <Container maxWidth={700} marginTop={5}>
              <Chart
                type="bar"
                data={data}
                options={{ plugins: { legend: { position: "bottom" } } }}
              />
            </Container>
          </>
        </Card>
        <Card>
          <>
            <Text fontSize={"20px"}>Carbon Offset Estimates</Text>
            <Flex direction={"row"} marginTop={5}>
              <ChangeIcon
                img={carbonIcon.src}
                text="This Week"
                amount="126.4kg"
                change={1.2}
              ></ChangeIcon>
              <ChangeIcon
                img={carbonIcon.src}
                text="Last Week"
                amount="117.7kg"
                change={1.1}
              ></ChangeIcon>
              <ChangeIcon
                img={carbonIcon.src}
                text="This Month"
                amount="528.7kg"
                change={1.1}
              ></ChangeIcon>
            </Flex>
          </>
        </Card>
        <Card>
          <>
            <Text fontSize={"20px"}>Cost Savings by Department</Text>
            <Flex
              direction={"column"}
              marginLeft={5}
              marginTop={5}
              width={"45%"}
            >
              <ol>
                <li>
                  <Flex
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>Engineering</Text>
                    <Text color={"#56CA00"} fontSize={"13px"} marginLeft={5}>
                      + $1040.3
                    </Text>
                  </Flex>
                </li>
                <li>
                  <Flex
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>Business Development</Text>
                    <Text fontSize={"13px"} marginLeft={5} color={"#56CA00"}>
                      + $923.1
                    </Text>
                  </Flex>
                </li>
                <li>
                  <Flex
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>Human Resource</Text>
                    <Text fontSize={"13px"} marginLeft={5} color={"#56CA00"}>
                      + $749.9
                    </Text>
                  </Flex>
                </li>
                <li>
                  <Flex
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>Accounting</Text>
                    <Text fontSize={"13px"} marginLeft={5} color={"#56CA00"}>
                      + $724.3
                    </Text>
                  </Flex>
                </li>
              </ol>
            </Flex>
          </>
        </Card>
        <Card>
          <>
            <Text fontSize={"20px"}>Cost Savings by Department this Week</Text>
            <Flex
              direction={"column"}
              marginLeft={5}
              marginTop={5}
              width={"45%"}
            >
              <ol>
                <li>
                  <Flex
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>Human Resource</Text>
                    <Text color={"#56CA00"} fontSize={"13px"} marginLeft={5}>
                      + $84.2
                    </Text>
                  </Flex>
                </li>
                <li>
                  <Flex
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>Business Development</Text>
                    <Text fontSize={"13px"} marginLeft={5} color={"#56CA00"}>
                      + $78.1
                    </Text>
                  </Flex>
                </li>
                <li>
                  <Flex
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>Accounting</Text>
                    <Text fontSize={"13px"} marginLeft={5} color={"#56CA00"}>
                      + $65.4
                    </Text>
                  </Flex>
                </li>
                <li>
                  <Flex
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>Engineering</Text>
                    <Text fontSize={"13px"} marginLeft={5} color={"#56CA00"}>
                      + $58.7
                    </Text>
                  </Flex>
                </li>
              </ol>
            </Flex>
          </>
        </Card>
        <Card>
          <>
            <Text fontSize={"20px"}>WEP Prediction Accuracy</Text>
            <CircularProgress
              value={86}
              size="120px"
              color="#0987A0"
              thickness="8px"
            >
              <CircularProgressLabel>{"86%"}</CircularProgressLabel>
            </CircularProgress>
          </>
        </Card>
      </div>
    </div>
  );
};

export default Home;
