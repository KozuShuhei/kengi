// src/components/style.tsx
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  border: '1px solid #ccc',
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
  fontSize: '16px',
  left: '10px',
  textDecoration: 'underline',
});

const CustomTitle = styled(Typography)({
  fontSize: '14px',
  left: '10px',
});

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledCancel = styled(CloseIcon)({
  marginLeft: 'auto',
  marginTop: '-50px',
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

const ScrollableContainer = styled('div')({
  flex: '1',
  overflowY: 'auto',
  border: '1px solid #ccc',
  padding: '10px',
  margin: '20px',
});

const ButtonContents = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
  StyledCancel,
  StyledButton,
  StyledSelect,
  StyledTextField,
  ScrollableContainer,
  ButtonContents,
  LeftContents,
  RightContents,
};
