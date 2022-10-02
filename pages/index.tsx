import {
  Container,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import dollarIcon from "../static/dollarIcon.png";
import carbonIcon from "../static/carbonIcon.png";
import { Card, ChangeIcon, Menu } from "../components";
const Home: NextPage = () => {
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
                amount="$XXX"
                change={54}
              ></ChangeIcon>
            </Flex>
          </>
        </Card>
        <Card>
          <>
            <Text fontSize={"20px"}>Carbon Offset Estimates</Text>
            <Flex direction={"row"} marginTop={5}>
              <ChangeIcon
                img={carbonIcon.src}
                text="This Week"
                amount="$XXX"
                change={54}
              ></ChangeIcon>
            </Flex>
          </>
        </Card>
        <Card>
          <>
            <Text fontSize={"20px"}>Cost Savings by Department</Text>
            <Flex direction={"row"} marginTop={5}></Flex>
          </>
        </Card>
        <Card>
          <>
            <Text fontSize={"20px"}>Cost Savings by Department this Week</Text>
            <Flex direction={"row"} marginTop={5}></Flex>
          </>
        </Card>
        <Card>
          <>
            <Text fontSize={"20px"}>WEP Prediction Accuracy</Text>
            <CircularProgress
              value={80}
              size="120px"
              color="#0987A0"
              thickness="8px"
            >
              <CircularProgressLabel>{"80%"}</CircularProgressLabel>
            </CircularProgress>
          </>
        </Card>
      </div>
    </div>
  );
};

export default Home;
