// src/components/style.tsx
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  backgroundColor: '#ddd',
});

const TextContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0 5px',
  padding: '0 20px',

  '& > *:not(:last-child)': {
    marginRight: '40px',
  },
});

const Row = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px 0 5px',

  '& > *:not(:last-child)': {
    marginRight: '50px',
  },
});

const CustomText = styled(Typography)({
  fontSize: '0.875rem',
  left: '10px',
});

const CustomTitle = styled(Typography)({
  fontSize: '10px',
});

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const CancelContainer = styled(IconButton)({
  marginLeft: 'auto',
  marginTop: '-60px',
  marginRight: '20px',
});

const StyledButton = styled(Button)({
  margin: '10px',
});

const StyledSelect = styled(Select)({
  width: '130px',
  height: '40px'
});

const StyledTextField = styled(TextField)({
  width: '150px',
  '& .MuiInputBase-input': {
    height: '5px',
  },
});

const TableContainer = styled('div')({
  border: '1px solid #ccc',
  padding: '10px',
  margin: '20px',
});

const ButtonContents = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px',
});

const LeftContents = styled('div')({
  float: 'left',
});

const RightContents = styled('div')({
  float: 'right',
  marginRight: '0',
});

export {
  Container,
  TextContainer,
  Row,
  CustomText,
  CustomTitle,
  Column,
  CancelContainer,
  StyledButton,
  StyledSelect,
  StyledTextField,
  TableContainer,
  ButtonContents,
  LeftContents,
  RightContents,
};
