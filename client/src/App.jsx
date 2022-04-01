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

const apiUrl = "https://jobsdata.herokuapp.com/api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
/* App component */

const App = () => {
  let [state, setState] = useState({
    showURL: false,
    showExpiry: false,
    rows: [{ None: "None" }],
    totalPos: 0
  });

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

  // get data from insert part textfield and save in insertData Object
  //Do not forget to update numPositions
  const submitInsertDataClick = () => {
    insertPosition(
      document.getElementById("insertTitle").value,
      document.getElementById("insertExpiry").value,
      document.getElementById("insertUrl").value,
      document.getElementById("insertDesc").value,
      document.getElementById("insertComID").value,
      document.getElementById("insertCountryName").value,
      document.getElementById("insertCityName").value,
      document.getElementById("insertpType").value)
  };

  // get data from insert part textfield and save in updateData Object
  const submitUpdateDataClick = () => {
    updatePosition(
      document.getElementById("updatepID").value,
      document.getElementById("updateTitle").value,
      document.getElementById("updateExpiry").value,
      document.getElementById("updateUrl").value,
      document.getElementById("updateDesc").value
    )
  };

  //Do not forget to update numPositions
  const submitDeleteDataClick = () => {
    let pID = document.getElementById("deletepID").value;
    try {
      const response = fetch(`${apiUrl}/positions/${pID}`, {
        method: 'DELETE'
      });
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  };

  const submitDeleteCasDataClick = () => {
    let counName = document.getElementById("deleteCountry").value;
    console.log(`${apiUrl}/countries/${counName}`);
    try {
      const response = fetch(`${apiUrl}/countries/${counName}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // check the filter, query and get data
  // /api/positions/:queryType/:pid/:url/:description/:title/:expiry/:comid/:ptype/
  async function getDataProjQuery() {
    try {
      fetch(
        `${apiUrl}/positions/projection/true/true/false/true/true/false/false`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setState({
            ...state,
            rows: data,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  }

  async function insertPosition(
    title,
    expiry,
    url,
    description,
    comID,
    counName,
    cityName,
    pType
  ) {
    let postBody = JSON.stringify({
      url: url,
      description: description,
      title: title,
      expiry: expiry,
      comid: parseInt(comID),
      ptype: pType.toString(),
      cityname: cityName,
      counname: counName,
    });

    console.log(postBody)

    try {
      const response = await fetch(`${apiUrl}/positions/`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: postBody,
      });
      console.log(response.json());
    } catch {}
  }

  async function updatePosition(
    pID,
    title,
    expiry,
    url,
    description
  ) {
    let postBody = JSON.stringify({
      pid: parseInt(pID),
      url: url,
      description: description,
      title: title,
      expiry: expiry
    });

    console.log(postBody)

    try {
      const response = await fetch(`${apiUrl}/positions/`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: postBody,
      });
      console.log(response.json());
    } catch {}
  }

  const selectionQueryHandle = () => {
    try {
      fetch(
        `${apiUrl}/positions/selection/true/${state.showURL}/false/true/${state.showExpiry}/false/false`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setState({
            ...state,
            rows: data,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  };

  const projectionQueryHandle = () => {
    try {
      fetch(
        `${apiUrl}/positions/projection/true/${state.showURL}/false/true/${state.showExpiry}/false/false`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setState({
            ...state,
            rows: data,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  };
  const joinQueryHandle = () => {
    try {
      fetch(
        `${apiUrl}/positions/join/`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setState({
            ...state,
            rows: data,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  };
  const nestedAggregationHandle = () => {
    try {
      fetch(`${apiUrl}/positions/aggregation_positions_count_groupby`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setState({
            ...state,
            rows: data,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  };
  const divisionQueryHandle = () => {
    try {
      fetch(`${apiUrl}/positions/division`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setState({
            ...state,
            rows: data,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  };

  function updateNumberOfPositions() {
    let num = 0;
    try {
      fetch(`${apiUrl}/positions/aggregation_positions_count`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success getting numPos:" + data._count);
          num = data._count;
          setState({
            ...state,
            totalPos: num,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
      num = -1;
      setState({
        ...state,
        totalPos: num,
      });
    }

  }

  const getCityProjQuery = () => {
    try {
      fetch(`${apiUrl}/cities/true/true/true/`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setState({
            ...state,
            rows: data,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  };
  const getCountryProjQuery = () => {
    try {
      fetch(`${apiUrl}/countries`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setState({
            ...state,
            rows: data,
          });
        });
    } catch (error) {
      console.log("Error:\n", error);
    }
  };
  

  return (
    <>
      <body>
        <main>
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
                      <Button
                        variant="outlined"
                        disableElevation
                        onClick={selectionQueryHandle}
                        align="right"
                      >
                        Get Active Positions
                      </Button>
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
                        onClick={(event) =>
                          setState({
                            ...state,
                            showURL: event.target.checked,
                          })
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Show Expiry Date"
                        onClick={(event) =>
                          setState({
                            ...state,
                            showExpiry: event.target.checked,
                          })
                        }
                      />
                      <Button
                        variant="outlined"
                        disableElevation
                        onClick={projectionQueryHandle}
                        align="right"
                      >
                        Search
                      </Button>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <Typography variant="h6">Join Query</Typography>
                      <Button
                        variant="outlined"
                        disableElevation
                        onClick={joinQueryHandle}
                        align="right"
                      >
                        Get Company Details
                      </Button>
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
                          onClick={nestedAggregationHandle}
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
                          onClick={divisionQueryHandle}
                          align="right"
                        >
                          positions of company with all position type
                        </Button>
                      </Box>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <Typography variant="h6">
                        
                        Total Positions available
                      </Typography>
                      
                      {
                        <Typography variant="h5"> {state.totalPos} </Typography>
                      }<Button variant="outlined" onClick={updateNumberOfPositions}>Update</Button>
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
                  <ButtonGroup
                    variant = "contained"
                    aria-label="outlined button group"
                  >
                    <Button
                      onClick={getDataProjQuery}
                      align="right"
                    >
                      Show all positions
                    </Button>
                    <Button
                      onClick={getCountryProjQuery}
                      align="right"
                    >
                      Show all Countries
                    </Button>
                    <Button
                      onClick={getCityProjQuery}
                      align="right"
                    >
                      Show all Cities
                    </Button>
                  </ButtonGroup>

                    

                    
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
                    <TextField required id="insertpType" label="Position Type" />
                    <TextField required id="insertCountryName" label="Country" />
                    <TextField required id="insertCityName" label="City" />
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

          <TableContainer id="table-from-data" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow key="Table Header">
                  {Object.keys(state.rows[0]).map((key) => (
                    <TableCell align="left"> {key} </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {state.rows.map((row) => (
                  <TableRow key={Object.keys(row)[0] ? row[Object.keys(row)[0]] + row[Object.keys(row)[1]] : row[Object.keys(row)[0]]}>
                    {Object.keys(row).map((key) => (
                      <TableCell align="left"> {row[key]} </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </body>
    </>
  );
};

export default App;
