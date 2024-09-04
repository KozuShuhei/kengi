// src\features\search\SeachClimateChangePrediction.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { MenuItem, Checkbox, FormControlLabel, SelectChangeEvent } from '@mui/material';
import OrderList from '../Ecommerce/Orders/OrderList/index.js'
import Pulldown from '../pulldown/Pulldown'
import SeachClimateChangePredictionPullDown from '../pulldown/SeachClimateChangePredictionPullDown'
import SelectTable from './../table/SelectTable'
import {
  Container,
  Row,
  CustomText,
  StyledCancel,
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
  closeClimateChangePrediction: () => void;
}

const SearchRainfallData: React.FC<SearchRainfallDataProps> = ({ selectedPlaces, closeClimateChangePrediction }) => {
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
        <h4>気候変動予測データ検索</h4>
      </Row>
      <StyledCancel onClick={closeClimateChangePrediction} />
      <Row>
        <CustomText>
          {selectedPlaces}
        </CustomText>
      </Row>

      <Row>
        <CustomText>水系詳細選択</CustomText>
        <Pulldown />
      </Row>
      <Row>
        <CustomText>気候変動データ選択</CustomText>
        <SeachClimateChangePredictionPullDown />
      </Row>
      <Row>
        <StyledTextField type="date" />
        <CustomText>〜</CustomText>
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
