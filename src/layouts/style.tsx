// src/components/style.tsx
import { styled } from '@mui/material/styles';

const CustomHeader = styled('header')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '10%',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #ccc',
});

const ElementContents = styled('div')({
  padding: '10px',
});

const CustomSelect = styled('select')({
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
});

export {
  CustomHeader,
  CustomSelect,
  ElementContents,
};
