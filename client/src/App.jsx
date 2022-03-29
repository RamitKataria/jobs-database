import React from 'react';
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
import { DataGrid } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';

/* Data for table*/
const columns = [
    {field: "id", headerName: "pID", width: 70},
    {field: "title", headerName: "title", width: 150},
    {field: "expiry", headerName: "expiry", width: 150},
    {field: "url", headerName: "url", width: 250},
    {field: "desc", headerName: "desc", sortable: false, width: 250},
    {field: "pType", headerName: "pType", sortable: false, width: 250},
    {field: "Country", headerName: "Country", sortable: false, width: 250},
    {field: "City", headerName: "City", sortable: false, width: 250},
    {field: "reqID", headerName: "reqID", sortable: false, width: 250}
];

const rows = [
    {id: 1, title: "web developper", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 2, title: "IT consultant", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 3, title: "OS Engineer", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 4, title: "Customer service", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 5, title: "Tutor", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 6, title: "Teacher", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 7, title: "Professor", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 8, title: "Analyst", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 9, title: "Cloud Engineer", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 10, title: "Actor", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 11, title: "Actress", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"},
    {id: 12, title: "RandomJob", expiry: "2020/12/01", url: "www.webdev-jobpost.com", desc: "description of job haha"}
];



/* App component */

const App = () => {
    
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
                                                <FormControlLabel control={<Checkbox defaultChecked/>} label="Show Expired Jobs" />
                                            </FormGroup>                      
                                        <Typography variant="h6">Projection Query <br /></Typography>                  
                                                    <FormControlLabel control={<Checkbox />} label="URL" />
                                                    <FormControlLabel control={<Checkbox />} label="Position Type" />
                                                    <FormControlLabel control={<Checkbox />} label="Requirement ID" />             
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
                                <TextField required id="title" label="title" />
                                <TextField required id="expiry" label="expiry date" />
                                <TextField required id="url" label="URL" />
                                <TextField required id="desc" label="description" />
                                <Button color="inherit" onClick={handleAdminClick} align="right">Insert</Button>
                            </Box>
                        </div>
                        <div id="UpdateMode">
                            <Typography>Update Data</Typography>
                            <Box component="form" sx={{ "& .MuiTextField-root": {m: 1, width: "25ch"}, }} noValidate autoComplete="off">
                                    <TextField required id="pID" label="pID" />
                                    <TextField required id="title" label="title" />
                                    <TextField required id="expiry" label="expiry date" />
                                    <TextField required id="url" label="URL" />
                                    <TextField required id="desc" label="description" />
                                    <Button color="inherit" onClick={handleAdminClick} align="right">Update</Button>
                                </Box>
                        </div>
                        <div id="DeleteMode">
                            <Typography>Delete data</Typography>
                            <Box component="form" sx={{ "& .MuiTextField-root": {m: 1, width: "25ch"}, }} noValidate autoComplete="off">
                                <TextField required id="pID" label="pID" />
                                <Button color="inherit" onClick={handleAdminClick} align="right">Delete</Button>
                            </Box>
                        </div>

                    </AccordionDetails>
                </Accordion>
            </section>
        </body>




        <main>
            <div style={{height: 630, with: "100%"}}>
                       <DataGrid rows={rows} columns={columns} pageSize={10} rowPerPageOptions={[10]} />
            </div>
        </main>
        </>


    );
    
}


export default App;