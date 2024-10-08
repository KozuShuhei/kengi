import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { MenuItem, Checkbox, FormControlLabel, SelectChangeEvent } from '@mui/material';
import OrderList from '../Ecommerce/Orders/OrderList/index.js'
import Pulldown from '../pulldown/Pulldown'
import SelectTable from './../table/SelectTable'
import CloseIcon from '@mui/icons-material/Close';

import {
  Container,
  TextContainer,
  Row,
  CustomText,
  CustomTitle,
  CancelContainer,
  StyledButton,
  StyledSelect,
  StyledTextField,
  TableContainer,
  ButtonContents,
  LeftContents,
  RightContents,
} from './style';

interface SearchRainfallDataProps {
  selectedPlaces: Array<String>;
  closeRainfall: () => void;
}

const SearchRainfallData: React.FC<SearchRainfallDataProps> = ({ selectedPlaces, closeRainfall }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedValue(event.target.value as string);
  };

  const handleMapButtonClick = () => {
    navigate('/map');
  };

  const handleMapGraphClick = () => {
    navigate('/graph');
  };

  return (
    <Container>
      <Row>
        <h4>実績降雨データ検索</h4>
      </Row>
      <CancelContainer onClick={closeRainfall}>
        <CloseIcon />
      </CancelContainer>
      <Row>
        {selectedPlaces[0]}
      </Row>

      <Row>
        {
          selectedPlaces.length < 2 ? (
            <>
              <CustomTitle>水系選択</CustomTitle>
              <Pulldown selectItems={['集水域','氾濫域']} />
            </>
          ) : (
            <CustomTitle>{selectedPlaces[1]}</CustomTitle>
          )
        }
        {/* {
          selectedPlaces.length < 3 ? (
            <>
              <CustomTitle>水系選択</CustomTitle>
              <Pulldown selectItems={['集水域','氾濫域']} />
            </>
          ) : (
            <CustomTitle>{selectedPlaces[2]}</CustomTitle>
          )
        }
        {
          selectedPlaces.length < 4 ? (
            <>
              <CustomTitle>水系選択</CustomTitle>
              <Pulldown selectItems={['集水域','氾濫域']} />
            </>
          ) : (
            <CustomTitle>{selectedPlaces[3]}</CustomTitle>
          )
        } */}
      </Row>
      <Row>
        <StyledTextField type="date" />
        <CustomTitle>〜</CustomTitle>
        <StyledTextField type="date" />
      </Row>
      <Row>
        <StyledButton variant="contained" color="primary">検索</StyledButton>
      </Row>
      <SelectTable />
      <ButtonContents>
        <LeftContents>
          <StyledButton style={{ fontSize: '10px' }} variant="contained" onClick={handleMapButtonClick}>地図で表示</StyledButton>
          <StyledButton style={{ fontSize: '10px' }} variant="contained" onClick={handleMapGraphClick}>グラフで見る</StyledButton>
        </LeftContents>
        <RightContents>
          <select style={{width: '80px', height: '30px'}}>
            <option>CSV</option>
            <option>選択肢のサンプル2</option>
          </select>
          <StyledButton style={{ fontSize: '10px' }} variant="contained">ダウンロード</StyledButton>
        </RightContents>
      </ButtonContents>
    </Container>
  );
};

export default SearchRainfallData;
