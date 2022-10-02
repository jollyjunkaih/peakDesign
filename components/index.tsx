import React from "react";
import { Container, Text, Flex, Box } from "@chakra-ui/react";
import logo from "../static/peak-logo.png";
import Link from "next/link";

export const Card = ({ children }: { children: React.ReactElement }) => {
  return (
    <Box
      borderRadius={6}
      boxShadow={"0px 3px 10px rgba(58, 53, 65, 0.2)"}
      style={{
        margin: 20,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      {children}
    </Box>
  );
};

const MenuItem = ({ selected, text }: { selected: boolean; text: string }) => {
  return (
    <Container
      backgroundColor={selected ? "#0987A0" : "transparent"}
      style={{
        paddingLeft: 20,
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      <Text fontSize="16px" color={selected ? "white" : "black"}>
        {text}
      </Text>
    </Container>
  );
};

export const Menu = ({ selected }: { selected: string }) => {
  return (
    <Flex direction={"column"} width={300}>
      <img
        style={{ marginLeft: 20, marginTop: 20, marginBottom: 10 }}
        width={90}
        height={30}
        src={logo.src}
      ></img>
      <Link href={"/"}>
        <a>
          <MenuItem
            selected={selected == "DASHBOARD" ? true : false}
            text="Dashboard"
          />
        </a>
      </Link>
      <Link href={"/recommendations"}>
        <a>
          <MenuItem
            selected={selected == "RECOMMENDATIONS" ? true : false}
            text="Recommendations"
          />
        </a>
      </Link>
      <MenuItem selected={selected == "DATA" ? true : false} text="Data" />
    </Flex>
  );
};

export const ChangeIcon = ({
  img,
  text,
  amount,
  change,
}: {
  img: string;
  text: string;
  amount: string;
  change: number;
}) => {
  return (
    <Flex direction={"row"}>
      <img src={img}></img>
      <Flex direction={"column"} marginLeft={2}>
        <Text color="rgba(58, 53, 65, 0.68)" fontSize={"12px"}>
          {text}
        </Text>
        <Flex direction={"row"} alignItems="center">
          <Text fontSize="20px">{amount}</Text>
          <Text marginLeft={2} color={"#56CA00"} fontSize="12px">
            {"+" + change + "%"}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
