import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  font-size: 14px;
  background-color: #f9f9f9;
  z-index: 1;
`;

const Th = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
  background-color: #f1f1f1;
  text-align: left;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 10px;
`;

const Tr = styled.tr`

`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin: 0;
`;

const RainfallTable: React.FC = () => {
  const data = [
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
    { system: '川水系', datetime: '2022年1月3日12時〜2022年1月4日12時', rainfall: '流域平均雨量200mm' },
    { system: '川水系', datetime: '2022年1月5日12時〜2022年1月6日12時', rainfall: '流域平均雨量150mm' },
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
    { system: '川水系', datetime: '2022年1月3日12時〜2022年1月4日12時', rainfall: '流域平均雨量200mm' },
    { system: '川水系', datetime: '2022年1月5日12時〜2022年1月6日12時', rainfall: '流域平均雨量150mm' },
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
    { system: '川水系', datetime: '2022年1月3日12時〜2022年1月4日12時', rainfall: '流域平均雨量200mm' },
    { system: '川水系', datetime: '2022年1月5日12時〜2022年1月6日12時', rainfall: '流域平均雨量150mm' },
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
    { system: '川水系', datetime: '2022年1月1日12時〜2022年1月2日12時', rainfall: '流域平均雨量100mm' },
  ];

  return (
    <TableContainer>
      <Table>
        <Thead>
          <tr>
            <Th style={{width: '5%'}}><Checkbox /></Th>
            <Th style={{width: '10%'}}>水系</Th>
            <Th>日時</Th>
            <Th style={{width: '20%'}}>降雨量</Th>
          </tr>
        </Thead>
        <tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td><Checkbox /></Td>
              <Td>{row.system}</Td>
              <Td>{row.datetime}</Td>
              <Td>{row.rainfall}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default RainfallTable;
