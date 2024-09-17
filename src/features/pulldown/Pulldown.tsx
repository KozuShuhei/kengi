import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface DropdownMenuProps {
  selectItems: Array<String>;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ selectItems }) => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{ 
        minWidth: 50,
        maxWidth: 100, 
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
        {
          selectItems.map((item) => {
            return (
              <MenuItem>{item}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  );
};

export default DropdownMenu;