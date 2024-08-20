import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{ 
        minWidth: 200,
        maxWidth: 200, 
        fontSize: '0.875rem'
      }}
      size="small"
    >
      <InputLabel
        id="dropdown-label"
        sx={{ fontSize: '0.875rem' }}
      >
        選択してください
      </InputLabel>
      <Select
        labelId="dropdown-label"
        value={selectedOption}
        onChange={handleChange}
        label="選択してください"
        sx={{ fontSize: '0.875rem' }}
      >
        <MenuItem value="si-cat">SI-CAT</MenuItem>
        <MenuItem value="yamada">yamada</MenuItem>
        <MenuItem value="2-degree-rise">現在気候・2℃上昇</MenuItem>
        <MenuItem value="4-degree-rise">現在気候・4℃上昇</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropdownMenu;