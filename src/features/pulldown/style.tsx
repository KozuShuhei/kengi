import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from 'react-select';

const StyledSelect = styled(Select)({
  width: '130px',
  height: '40px'
});

const StyledTextField = styled(TextField)({
  width: '200px',
  '& .MuiInputBase-input': {
    height: '15px',
  },
});

const ScrollableContainer = styled('div')({
  maxHeight: '150px',
  overflowY: 'auto',
  width: '100%',
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px',
});

export {
  StyledSelect,
  StyledTextField,
  ScrollableContainer,
};
