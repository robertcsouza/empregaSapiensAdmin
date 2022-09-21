
import { Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MDButton from "components/MDButton";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';


export default function SearchList({ itemList, call }) {



  const [filteredList, setFilteredList] = new useState(itemList);
  const [inputValue, setInputValue] = useState("");


  const filterBySearch = (event) => {
      event.preventDefault();
    // Access input value
    const query = event.target.value;
    setInputValue(query);
    // Create copy of item list
    var updatedList = [...itemList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.nome.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  return (
    <MDBox className="App" ml={4} sx={{ width: 400 }}>
      <MDBox className="search-header">
        <MDBox component="form" border={1} borderRadius="10" borderColor="grey.300" onSubmit={filterBySearch}
          sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', width: 250, borderRadius: 2 }} >
          
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            size='small'
            placeholder="Pesquisar"
            onChange={filterBySearch}
            inputProps={{ 'aria-label': 'Pesquisar' }}
          />

          <SearchIcon />
         

        </MDBox>

      </MDBox>
      <MDBox mt={2}>
        {!filteredList.length ? <MDBox mb={1} mt={1} display="flex" justifyContent="space-between" alignItems="center">{inputValue} <IconButton color="info" aria-label="upload picture" component="label" onClick={() => {
          call({ nome: inputValue, isNew: true })
        }}>

          <Tooltip title="Adicioanar">
            <AddIcon />
          </Tooltip>


        </IconButton> </MDBox> : <div id="item-list">

          {filteredList.map((item, index) => (
            <MDBox mb={1} mt={1} key={index} display="flex" justifyContent="space-between" alignItems="center">{item.nome} <IconButton color="info" aria-label="upload picture" component="label" onClick={() => { call({ ...item, isNew: false }) }}>
              <AddIcon />
            </IconButton> </MDBox>
          ))}

        </div>}
      </MDBox>
    </MDBox>
  );

}