import React, { useMemo } from "react";
import { useTable, useSortBy, Column, HeaderGroup, Row, useGlobalFilter, usePagination, TableInstance, UsePaginationInstanceProps } from 'react-table';
import {
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface TableData {
  waterSystem: string;
  dateTime: string;
  rainfall: string;
}

const TableComponent: React.FC = () => {
  const tableData = useMemo<TableData[]>(
    () => [
      { waterSystem: '川水系', dateTime: '2022年1月1日12時～2022年1月2日12時', rainfall: '流域平均雨量100mm' },
      { waterSystem: '川水系', dateTime: '2022年1月3日12時～2022年1月4日12時', rainfall: '流域平均雨量150mm' },
      { waterSystem: '川水系', dateTime: '2022年1月5日12時～2022年1月6日12時', rainfall: '流域平均雨量200mm' },
    ],
    []
  );

  const columnsData = useMemo<Column<TableData>[]>(
    () => [
      {
        Header: 'チェックボックス',
        id: 'checkbox',
        Cell: () => <Checkbox />
      },
      {
        Header: '水系',
        accessor: 'waterSystem',
      },
      {
        Header: '日時',
        accessor: 'dateTime',
      },
      {
        Header: '降雨量',
        accessor: 'rainfall',
      },
    ],
    []
  );

  const columns = useMemo(() => columnsData, []);
  const data = useMemo(() => tableData, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as TableInstance<TableData> & UsePaginationInstanceProps<TableData>;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup: HeaderGroup<TableData>) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row: Row<TableData>) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
