import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import SearchTable2 from "../../../../components/Tables/SearchTable2";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { columnsData2 } from "../../../../variables/columnsData";
import tableData2 from "../../../../variables/tableData2.json";

function OrderList() {
  return (
    <SearchTable2 tableData={tableData2} columnsData={columnsData2} />
  );
}

export default OrderList;
