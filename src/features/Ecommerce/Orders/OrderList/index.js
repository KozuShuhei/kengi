/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
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
