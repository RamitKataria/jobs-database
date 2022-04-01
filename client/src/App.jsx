import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";

var numPositions = 0;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
/* App component */

const App = () => {
  let [rows, setRows] = useState([
    { None: "None" }
  ]);

  /* handle buttonClicks */
  const handleAdminClick = () => {
    const AdminModeEdit = document.getElementById("AdminMode");
    if (AdminModeEdit.style.display === "block") {
      AdminModeEdit.style.display = "none";
    } else {
      AdminModeEdit.style.display = "block";
    }
  };

  const handleInsertModeClick = () => {
    const UpdateMode = document.getElementById("UpdateMode");
    const InsertMode = document.getElementById("InsertMode");
    const DeleteMode = document.getElementById("DeleteMode");

    UpdateMode.style.display = "none";
    InsertMode.style.display = "block";
    DeleteMode.style.display = "none";
  };

  const handleUpdateModeClick = () => {
    const UpdateMode = document.getElementById("UpdateMode");
    const InsertMode = document.getElementById("InsertMode");
    const DeleteMode = document.getElementById("DeleteMode");

    UpdateMode.style.display = "block";
    InsertMode.style.display = "none";
    DeleteMode.style.display = "none";
  };

  const handleDeleteModeClick = () => {
    const UpdateMode = document.getElementById("UpdateMode");
    const InsertMode = document.getElementById("InsertMode");
    const DeleteMode = document.getElementById("DeleteMode");

    UpdateMode.style.display = "none";
    InsertMode.style.display = "none";
    DeleteMode.style.display = "block";
  };

  let insertData = {
    insertTitle: null,
    insertExpiry: null,
    insertURL: null,
    insertDesc: null,
    insertComID: null,
    insertCountryName: null,
    insertCityName: null,
  };

  let updateData = {
    updatepID: null,
    updateTitile: null,
    updateExpiry: null,
    updateURL: null,
    updateDesc: null,
  };

  let deleteData = {
    deletepID: null,
  };

  let deleteCasData = {
    deleteCountry: null,
  };

  // get data from insert part textfield and save in insertData Object
  //Do not forget to update numPositions
  const submitInsertDataClick = () => {
    insertData.insertTitle = document.getElementById("insertTitle").value;
    insertData.insertExpiry = document.getElementById("insertExpiry").value;
    insertData.insertURL = document.getElementById("insertUrl").value;
    insertData.insertDesc = document.getElementById("insertDesc").value;
    insertData.insertComID = document.getElementById("insertComID").value;
    insertData.insertCountryName =
      document.getElementById("insertCountryName").value;
    insertData.insertCityName = document.getElementById("insertCityName").value;
    /*console.log(insertData.insertTitle);*/
  };

  // get data from insert part textfield and save in updateData Object
  const submitUpdateDataClick = () => {
    updateData.updatepID = document.getElementById("updatepID").value;
    updateData.updateTitle = document.getElementById("updateTitle").value;
    updateData.updateExpiry = document.getElementById("updateExpiry").value;
    updateData.updateURL = document.getElementById("updateUrl").value;
    updateData.updateDesc = document.getElementById("updateDesc").value;
  };

  //Do not forget to update numPositions
  const submitDeleteDataClick = () => {
    deleteData.deletepID = document.getElementById("deletepID").value;
  };

  const submitDeleteCasDataClick = () => {
    deleteCasData.deleteCountry =
      document.getElementById("deleteCountry").value;
  };

  // check the filter, query and get data
  async function fetchPositions() {
    try {
      fetch(
        "https://jobsdata.herokuapp.com/api/positions/projection/true/true/false/true/true/false/false"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRows(data);
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  }

  // Object to Monitor if filter Checkbox is checked or not
  let filterChecker = {
    ShowExpiredJobs: true,
    ShowURL: false,
    ShowExpiryDate: false,
    ShowCompany: false,
  };

  /* on click handler of checkbox in filter section */
  const filterExpCheck = () => {
    filterChecker.ShowExpiredJobs = !filterChecker.ShowExpiredJobs;
  };

  const filterURLCheck = () => {
    filterChecker.ShowURL = !filterChecker.ShowURL;
  };

  const filterExpDateCheck = () => {
    filterChecker.ShowExpiryDate = !filterChecker.ShowExpiryDate;
  };

  const filterComCheck = () => {
    filterChecker.ShowCompany = !filterChecker.ShowCompany;
  };

  // Do action of nested aggregation query
  const handleNestedAggregationCheck = () => {};

  // Do action of division query
  const handleDivisionCheck = () => {};

  return (
    <>
      <body>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <WorkOutlineIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  CPSC304: Job Database
                </Typography>
                <Button color="inherit" onClick={handleAdminClick}>
                  Switch to admin
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </div>

        <section>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <FilterAltIcon />
              <Typography>Filter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="h6">
                      Selection Query <br />
                    </Typography>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Show Expired Jobs"
                      onClick={filterExpCheck}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="h6">
                      Projection Query <br />
                    </Typography>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Show URL"
                      onClick={filterURLCheck}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Show Expiry Date"
                      onClick={filterExpDateCheck}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="h6">Join Query</Typography>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Show Company"
                      onClick={filterComCheck}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="h6">
                      Nested Aggregation Query
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        "& > *": { m: 1 },
                      }}
                    >
                      <Button
                        variant="outlined"
                        disableElevation
                        onClick={handleNestedAggregationCheck}
                        align="right"
                      >
                        Number of Position By City
                      </Button>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="h6">Division</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        "& > *": { m: 1 },
                      }}
                    >
                      <Button
                        variant="outlined"
                        disableElevation
                        onClick={handleDivisionCheck}
                        align="right"
                      >
                        Number of Position By City
                      </Button>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="h6">
                      Total Position available
                    </Typography>
                    <Typography variant="h5">{numPositions}</Typography>
                  </Item>
                </Grid>
              </Grid>

              <Container maxWidth="md">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& > *": { m: 1 },
                  }}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={fetchPositions}
                    align="right"
                  >
                    Search
                  </Button>
                </Box>
              </Container>
            </AccordionDetails>
          </Accordion>
          <Accordion id="AdminMode">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <ModeEditIcon />
              <Typography>Edit Database</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "& > *": { m: 1 },
                }}
              >
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button onClick={handleInsertModeClick}>Insert</Button>
                  <Button onClick={handleUpdateModeClick}>Update</Button>
                  <Button onClick={handleDeleteModeClick}>Delete</Button>
                </ButtonGroup>
              </Box>
              <div id="InsertMode">
                <Typography>Insert Data</Typography>
                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField required id="insertTitle" label="Title Name" />
                  <TextField required id="insertExpiry" label="Expiry Date" />
                  <TextField required id="insertUrl" label="URL" />
                  <TextField required id="insertDesc" label="Description" />
                  <TextField required id="insertComID" label="Company ID" />
                  <TextField
                    required
                    id="insertCountryName"
                    label="Country Name"
                  />
                  <TextField required id="insertCityName" label="City Name" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "& > *": { m: 1 },
                    }}
                  >
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={submitInsertDataClick}
                      align="right"
                    >
                      Insert
                    </Button>
                  </Box>
                </Box>
              </div>
              <div id="UpdateMode">
                <Typography>Update Data</Typography>
                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField required id="updatepID" label="Position ID" />
                  <TextField required id="updateTitle" label="Title Name" />
                  <TextField required id="updateExpiry" label="Expiry Date" />
                  <TextField required id="updateUrl" label="URL" />
                  <TextField required id="updateDesc" label="Description" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "& > *": { m: 1 },
                    }}
                  >
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={submitUpdateDataClick}
                      align="right"
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              </div>
              <div id="DeleteMode">
                <Typography>Delete data</Typography>
                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="deletepID" label="pID" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "& > *": { m: 1 },
                    }}
                  >
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={submitDeleteDataClick}
                      align="right"
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>

                <Typography> Delete-Cascade</Typography>
                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="deleteCountry" label="Country" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "& > *": { m: 1 },
                    }}
                  >
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={submitDeleteCasDataClick}
                      align="right"
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </div>
            </AccordionDetails>
          </Accordion>
        </section>
      </body>

      <main>
        <TableContainer id="table-from-data" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow key="Table Header">
                {Object.keys(rows[0]).map((key) => (<TableCell align="left"> {key} </TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => 
                <TableRow key={row[Object.keys(row)[0]]}>
                  {Object.keys(row).map((key) => <TableCell align="left"> {row[key]} </TableCell>)}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
};

export default App;
