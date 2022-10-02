import {
  Button,
  Box,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Flex,
  Input,
  SliderMark,
  Slider,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Card, ChangeIcon, Menu } from "../components";
const Recommendations: NextPage = () => {
  const [wepData, setWepData] = useState([]);
  const [date, setDate] = useState(""); //yyyy-mm-dd
  const [duration, setDuration] = useState(0);
  const [bestTimeSlotValue, setBestTimeSlotValue] = useState(0);
  const [bestTimeSlot, setBestTimeSlot] = useState("00:00:00");
  const [endBestTimeSlot, setEndBestTimeSlot] = useState("00:00:00");
  const [bestTimeSlotList, setBestTimeSlotList] = useState([]);

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
        const prices = arrangedTimeArray.map((item) => {
          return item.price;
        });
        if (duration) {
          getRecommendedTimeSlots();
        }
      });
  };
  const getRecommendedTimeBlock = (prices: number[], n: number) => {
    // prices: an array of prices
    // n: number of contiguous blocks to recommend
    // returns: start and end times with the lowest average price

    // Filtered to 8.00am - 7.00pm
    // prices = prices.slice(16, 39);
    var total_price = Array(prices.length - n + 1);
    var hours = [...Array(prices.length).keys()].map(function (x) {
      return 8 + 0.5 * x;
    });
    // Calculate the total price for each block
    for (var i = 0; i < total_price.length; i++) {
      total_price[i] = prices.slice(i, i + n).reduce(function (a, b) {
        return a + b;
      });
    }

    // Return indices of sorted total prices
    var sorted_indices = Array.from(Array(total_price.length).keys()).sort(
      (a, b) =>
        total_price[a] < total_price[b]
          ? -1
          : (total_price[b] < total_price[a]) | 0
    );

    // Return the start hours corresponding to the lowest total price
    return sorted_indices.map(function (x) {
      return hours[x];
    });
  };
  const getRecommendedTimeSlots = () => {
    if (duration) {
      const prices = wepData.map((item) => {
        return item.price;
      });
      const recommendedTimes = getRecommendedTimeBlock(prices, 2 * duration);
      console.log(recommendedTimes);
      const bestTime = recommendedTimes[0];
      setBestTimeSlotList(recommendedTimes);
      let formattedBestTime = "";
      let temp = bestTime * 10;
      if (temp < 100) {
        formattedBestTime = "0" + bestTime.toString().slice(0, 1);
      } else formattedBestTime = bestTime.toString().slice(0, 2);
      if (temp % 2 == 0) {
        formattedBestTime = formattedBestTime.concat(":00");
      } else formattedBestTime = formattedBestTime.concat(":30");
      setBestTimeSlot(formattedBestTime);
      if (duration % 1 == 0) {
        let newTime = parseFloat(formattedBestTime.slice(0, 2)) + duration;
        let newerTime = newTime.toString();
        if (newTime < 10) newerTime = "0" + newTime.toString();
        let temp = newerTime.toString() + formattedBestTime.slice(2);
        setEndBestTimeSlot(temp);
      } else {
        if (formattedBestTime.slice(3) === "00") {
          const newTime =
            parseFloat(formattedBestTime.slice(0, 2)) + Math.floor(duration);
          let newerTime = newTime.toString();
          if (newTime < 10) newerTime = "0" + newTime.toString();
          let temp = newerTime.toString() + ":30";
          setEndBestTimeSlot(temp);
        } else {
          const newTime =
            parseFloat(formattedBestTime.slice(0, 2)) +
            Math.floor(duration) +
            1;
          let newerTime = newTime.toString();
          if (newTime < 10) newerTime = "0" + newTime.toString();
          let temp = newerTime.toString() + ":00";
          setEndBestTimeSlot(temp);
        }
      }
    }
  };
  const findNextBestTime = () => {
    let time = parseInt(bestTimeSlot.slice(0, 2));
    if (bestTimeSlot.slice(3) === "30") time = time + 0.5;
    let index = bestTimeSlotList.findIndex((item) => {
      return item === time;
    });
    let newBestTime = bestTimeSlotList[index + 1];
    setBestTimeSlotValue(newBestTime);

    console.log(newBestTime);
    let formattedBestTime = "";
    let temp = newBestTime * 10;
    if (temp < 100) {
      formattedBestTime = "0" + newBestTime.toString().slice(0, 1);
    } else formattedBestTime = newBestTime.toString().slice(0, 2);
    if (temp % 2 == 0) {
      formattedBestTime = formattedBestTime.concat(":00");
    } else formattedBestTime = formattedBestTime.concat(":30");
    console.log(formattedBestTime);
    setBestTimeSlot(formattedBestTime);

    if (duration % 1 == 0) {
      let newTime = parseFloat(formattedBestTime.slice(0, 2)) + duration;
      let newerTime = newTime.toString();
      if (newTime < 10) newerTime = "0" + newTime.toString();
      let temp = newerTime.toString() + formattedBestTime.slice(2);
      setEndBestTimeSlot(temp);
    } else {
      if (formattedBestTime.slice(3) === "00") {
        const newTime =
          parseFloat(formattedBestTime.slice(0, 2)) + Math.floor(duration);
        let newerTime = newTime.toString();
        if (newTime < 10) newerTime = "0" + newTime.toString();
        let temp = newerTime.toString() + ":30";
        setEndBestTimeSlot(temp);
      } else {
        const newTime =
          parseFloat(formattedBestTime.slice(0, 2)) + Math.floor(duration) + 1;
        let newerTime = newTime.toString();
        if (newTime < 10) newerTime = "0" + newTime.toString();
        let temp = newerTime.toString() + ":00";
        setEndBestTimeSlot(temp);
      }
    }
  };
  useEffect(() => {
    getRecommendedTimeSlots();
  }, [duration]);
  return (
    <div
      style={{
        backgroundColor: "#FFFFF0",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu selected="RECOMMENDATIONS"></Menu>
      <div style={{ paddingTop: 50, width: "100%" }}>
        <Card>
          <>
            <Flex
              direction={"row"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Text fontSize={"20px"}>Recommended Time Slots</Text>
              <Flex>
                <Button size={"xs"} borderRadius={30}>
                  <Text fontSize={"10px"}>Connect to Slack</Text>
                </Button>
                <Button size={"xs"} borderRadius={30}>
                  <Text fontSize={"10px"}>Connect to Mail</Text>
                </Button>
              </Flex>
            </Flex>
            <Flex direction={"row"} marginTop={5}>
              <Flex direction="column">
                <Text top={5} fontSize="12px">
                  Date
                </Text>
                <Input
                  width={200}
                  size="sm"
                  type="date"
                  onChange={(date) => {
                    setDate(date.target.value);
                  }}
                />
              </Flex>
              <Flex direction="column" marginLeft={10}>
                <Text fontSize="12px">Duration</Text>
                <Input
                  size={"sm"}
                  width={100}
                  placeholder="hours"
                  onChange={(duration) => {
                    setDuration(parseFloat(duration.target.value));
                  }}
                ></Input>
              </Flex>
            </Flex>
            <Button
              color={"#0987A0"}
              marginTop={5}
              size={"sm"}
              borderRadius={30}
              onClick={() => {
                getData();
              }}
            >
              <Text fontSize={"14px"}>Get Prices</Text>
            </Button>
          </>
        </Card>
        {wepData.length === 0 ? (
          <></>
        ) : (
          <Card>
            <Flex direction={"row"}>
              <div style={{ maxWidth: 500 }}>
                <Text top={5} fontSize="12px">
                  Chosen Time Slot
                </Text>
                <Input
                  value={bestTimeSlot}
                  width={200}
                  size="sm"
                  type="time"
                  disabled={true}
                />
                {" - "}
                <Input
                  value={endBestTimeSlot}
                  width={200}
                  size="sm"
                  type="time"
                  disabled={true}

                  // onChange={(time) => {
                  //   setDate(time.target.value);
                  // }}
                />
                <Flex direction={"column"} alignItems="end">
                  <Button
                    variant={"link"}
                    marginTop={2}
                    size={"sm"}
                    borderRadius={30}
                    onClick={() => findNextBestTime()}
                  >
                    <Text fontSize={"12px"}>Find Next Best Time Slot</Text>
                  </Button>

                  <Button
                    alignSelf={"start"}
                    variant={"solid"}
                    marginTop={5}
                    size={"md"}
                    borderRadius={30}
                    color={"#0987A0"}
                  >
                    <Text fontSize={"14px"}>Add to Scheduler</Text>
                  </Button>
                </Flex>
              </div>
              <div style={{ marginLeft: 50 }}>
                <TableContainer>
                  <Table variant="simple">
                    <TableCaption>Predicted WEP for {date}</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Time (0.5hr slots)</Th> <Th>WEP</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {wepData.map((item: any, index) => {
                        return (
                          <Tr
                            bgColor={
                              index >= 2 * (bestTimeSlotValue - 8) &&
                              index < 2 * (bestTimeSlotValue - 8) + duration * 2
                                ? "#0987A0"
                                : "transparent"
                            }
                          >
                            <Td>{item.time}</Td> <Td>{item.price}</Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            </Flex>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
