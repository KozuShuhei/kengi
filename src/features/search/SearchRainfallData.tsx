// src\features\search\SearchRainfallData.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { MenuItem, Checkbox, FormControlLabel, SelectChangeEvent } from '@mui/material';
import OrderList from '../Ecommerce/Orders/OrderList/index.js'
import Pulldown from '../map/Pulldown'
import {
  Container,
  TextContainer,
  Row,
  CustomText,
  CustomTitle,
  StyledCancel,
  StyledButton,
  StyledSelect,
  StyledTextField,
  ScrollableContainer,
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

  return (
    <Container>
      <Row>
        <h4>実績降雨データ検索</h4>
      </Row>
      <StyledCancel onClick={closeRainfall} />
      <TextContainer>
        {selectedPlaces.map((selectedPlace, index) => (
          <CustomText key={index}>{selectedPlace}</CustomText>
        ))}
      </TextContainer>

      <Row>
        <CustomTitle>水系詳細選択</CustomTitle>
        <Pulldown />
      </Row>
      <Row>
        <StyledTextField type="date" />
        <CustomTitle>〜</CustomTitle>
        <StyledTextField type="date" />
      </Row>
      <Row>
        <StyledButton variant="contained" color="primary">検索</StyledButton>
      </Row>
      <ScrollableContainer>
        <OrderList />
      </ScrollableContainer>
      <ButtonContents>
        <LeftContents>
          <StyledButton style={{ fontSize: '10px' }} variant="contained" onClick={handleMapButtonClick}>地図で表示</StyledButton>
          <StyledButton style={{ fontSize: '10px' }} variant="contained">グラフで見る</StyledButton>
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
