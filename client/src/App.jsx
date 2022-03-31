import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import { TableCell, TableContainer, TableHead, TableRow, Paper, Table, TableBody } from "@mui/material";


import DataTable from "./data/sampleData.json";

/* App component */

const App = () => {
    /* handle buttonClicks */
    const handleAdminClick = () => {
        const AdminMode = document.getElementById("AdminMode");
        if(AdminMode.style.display==="block"){
            AdminMode.style.display = "none";
        }else{
            AdminMode.style.display = "block";
        }
    }

    const handleInsertModeClick =() => {
        const UpdateMode = document.getElementById("UpdateMode");
        const InsertMode = document.getElementById("InsertMode");
        const DeleteMode = document.getElementById("DeleteMode");
        
        UpdateMode.style.display = "none";
        InsertMode.style.display = "block";
        DeleteMode.style.display = "none";
    }

    const handleUpdateModeClick =() => {
        const UpdateMode = document.getElementById("UpdateMode");
        const InsertMode = document.getElementById("InsertMode");
        const DeleteMode = document.getElementById("DeleteMode");
        
        UpdateMode.style.display = "block";
        InsertMode.style.display = "none";
        DeleteMode.style.display = "none";
    }

    const handleDeleteModeClick =() => {
        const UpdateMode = document.getElementById("UpdateMode");
        const InsertMode = document.getElementById("InsertMode");
        const DeleteMode = document.getElementById("DeleteMode");
        
        UpdateMode.style.display = "none";
        InsertMode.style.display = "none";
        DeleteMode.style.display = "block";
    }


    // get data from insert part textfield and save in insertData Object
    const submitInsertDataClick =() =>{
        /*const insertData = {
            insertTitle: document.getElementById("insertTitle").value,
            insertExpiry: document.getElementById("insertExpiry").value,
            insertUrl: document.getElementById("insertUrl").value,
            insertDesc: document.getElementById("insertDesc").value,
            insertComID: document.getElementById("insertComID").value,
            insertCountryName: document.getElementById("insertCountryName").value,
            insertCityName: document.getElementById("insertCityName").value
        };
        console.log(insertData.insertTitle);
        */
    }

    // get data from insert part textfield and save in updateData Object
    const submitUpdateDataClick =() =>{
        /*
        const updateData = {
            updatepID: document.getElementById("updatepID").value,
            updateTitle: document.getElementById("updateTitle").value,
            updateExpiry: document.getElementById("updateExpiry").value,
            updateUrl: document.getElementById("updateUrl").value,
            updateDesc: document.getElementById("updateDesc").value
        };
        */
    }

    const submitDeleteDataClick =() =>{
        /*
        const deleteData = {
            deletepID: document.getElementById("deletepID").value
        };
        */
    }


    // check the filter, query and get data
    async function tryingToFetch(){
        fetch("https://jobsdata.herokuapp.com/api/")
            .then(res => res.json())
            .then(data => console.log(data))
    }
   
    // Object to Monitor if filter Checkbox is checked or not
    let filterChecker = {
        ShowExpiredJobs: true,
        ShowURL: false,
        ShowPositionType: false,
        ShowRequiredID: false
    };

    /* on click handler of checkbox in filter section */
    const filterExpCheck =() =>{
        filterChecker.ShowExpiredJobs = !filterChecker.ShowExpiredJobs;
    }

    const filterURLCheck =() =>{
        filterChecker.ShowURL = !filterChecker.ShowURL;
        console.log(filterChecker.ShowURL);
    }

    const filterPTCheck =() =>{
        filterChecker.ShowPositionType = !filterChecker.ShowPositionType;
    }

    const filterRICheck =() => {
        filterChecker.ShowRequiredID = !filterChecker.ShowRequiredID;
    }


    return(
        <>
        <body>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton size="large" edge="start"  color="inherit" aria-label="menu" sx={{ mr: 2 }} >
                                <WorkOutlineIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                CPSC304: Job Database
                            </Typography>
                            <Button color="inherit" onClick={handleAdminClick}>Switch to admin</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
    
            <section>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <FilterAltIcon />
                        <Typography>Filter</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Container maxWidth="md">
                                        <Typography variant="h6">Selection Query <br /></Typography>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox defaultChecked/>} label="Show Expired Jobs" onClick={filterExpCheck} />
                                            </FormGroup>                      
                                        <Typography variant="h6">Projection Query <br /></Typography>                  
                                                    <FormControlLabel control={<Checkbox />} label="URL" onClick={filterURLCheck} />
                                                    <FormControlLabel control={<Checkbox />} label="Position Type" onClick={filterPTCheck} />
                                                    <FormControlLabel control={<Checkbox />} label="Requirement ID" onClick={filterRICheck} />  
                                        <Box sx={{display: 'flex',flexDirection: 'column', alignItems: 'center','& > *': {  m: 1,},  }}>
                                            <Button variant ="contained" disableElevation onClick={tryingToFetch} align="right">Search</Button>
                                        </Box>           
                    </Container>
                    </AccordionDetails>
                </Accordion>
                <Accordion id="AdminMode">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                        <ModeEditIcon />
                        <Typography>Edit Database</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{display: 'flex',flexDirection: 'column', alignItems: 'center','& > *': {  m: 1,},  }}>
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Button onClick={handleInsertModeClick}>Insert</Button>
                                <Button onClick={handleUpdateModeClick}>Update</Button>
                                <Button onClick={handleDeleteModeClick}>Delete</Button>
                            </ButtonGroup>
                        </Box>
                        <div id="InsertMode">
                            <Typography>Insert Data</Typography>
                            <Box component="form" sx={{ "& .MuiTextField-root": {m: 1, width: "25ch"}, }} noValidate autoComplete="off">
                                <TextField required id="insertTitle" label="Title Name" />
                                <TextField required id="insertExpiry" label="Expiry Date" />
                                <TextField required id="insertUrl" label="URL" />
                                <TextField required id="insertDesc" label="Description" />
                                <TextField required id="insertComID" label="Company ID" />
                                <TextField required id="insertCountryName" label="Country Name" />
                                <TextField required id="insertCityName" label="City Name" />  
                                <Box sx={{display: 'flex',flexDirection: 'column', alignItems: 'center','& > *': {  m: 1,},  }}>
                                    <Button variant ="contained" disableElevation onClick={submitInsertDataClick} align="right">Insert</Button>
                                </Box>
                            </Box>
                        </div>
                        <div id="UpdateMode">
                            <Typography>Update Data</Typography>
                            <Box component="form" sx={{ "& .MuiTextField-root": {m: 1, width: "25ch"}, }} noValidate autoComplete="off">
                                    <TextField required id="updatepID" label="Position ID" />
                                    <TextField required id="updateTitle" label="Title Name" />
                                    <TextField required id="updateExpiry" label="Expiry Date" />
                                    <TextField required id="updateUrl" label="URL" />
                                    <TextField required id="updateDesc" label="Description" />
                                    <Box sx={{display: 'flex',flexDirection: 'column', alignItems: 'center','& > *': {  m: 1,},  }}>
                                        <Button variant ="contained" disableElevation onClick={submitUpdateDataClick} align="right">Update</Button>
                                    </Box>
                                    
                                </Box>
                        </div>
                        <div id="DeleteMode">
                            <Typography>Delete data</Typography>
                            <Box component="form" sx={{ "& .MuiTextField-root": {m: 1, width: "25ch"}, }} noValidate autoComplete="off">
                                <TextField id="deletepID" label="pID" />
                                <Box sx={{display: 'flex',flexDirection: 'column', alignItems: 'center','& > *': {  m: 1,},  }}>
                                    <Button variant ="contained" disableElevation onClick={submitDeleteDataClick} align="right">Delete</Button>
                                </Box>
                            </Box>
                        </div>

                    </AccordionDetails>
                </Accordion>
            </section>
        </body>








        <main>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>pID</TableCell>
                        <TableCell align="right">title</TableCell>
                        <TableCell align="right">expiry</TableCell>
                        <TableCell align="right">city</TableCell>
                        <TableCell align="right">country</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {DataTable.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="left">{row.pID}</TableCell>
                        <TableCell align="right">{row.title}</TableCell>
                        <TableCell align="right">{row.expiry}</TableCell>
                        <TableCell align="right">{row.city}</TableCell>
                        <TableCell align="right">{row.country}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </main>
        </>


    );
    
}


export default App;