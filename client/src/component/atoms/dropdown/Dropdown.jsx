import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const Dropdown = ({ val, elements, element, setElement }) => {
  const DropdownTheme = createTheme({
    palette: {
      text: {
        primary: '#C4C4C4',
      },
    },
  });
  const handleChange = (event) => {
    setElement(event.target.value);
  };

  return (
    <ThemeProvider theme={DropdownTheme}>
      <Box sx={{ width: 100 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>{val}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={element}
            label='select'
            onChange={handleChange}
          >
            {elements.map((el, i) => (
              <MenuItem key={i} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default Dropdown;
